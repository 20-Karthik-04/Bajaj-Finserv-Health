const express = require('express');
const app = express();

app.use(express.json());

const USER_INFO = {
    user_id: "thalluruyagnasrikarthikeya_11122004",
    email: "tkarthikeya2004@gmail.com",
    roll_number: "22BCE1938"
};

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input. Expected 'data' array in request body."
            });
        }

        const inputArray = req.body.data;

        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let alphabeticalChars = [];

        inputArray.forEach(item => {
            const str = String(item);

            if (!isNaN(str) && str.trim() !== '') {
                const num = parseInt(str);
                sum += num;

                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            }
            else if (/^[A-Za-z]+$/.test(str)) {
                const upperCaseStr = str.toUpperCase();
                alphabets.push(upperCaseStr);

                for (let char of str) {
                    alphabeticalChars.push(char);
                }
            }

            else if (str.trim() !== '') {
                specialCharacters.push(str);
            }
        });

        let concatString = '';
        if (alphabeticalChars.length > 0) {

            const reversedChars = alphabeticalChars.reverse();

            reversedChars.forEach((char, index) => {
                if (index % 2 === 0) {
                    concatString += char.toUpperCase();
                } else {
                    concatString += char.toLowerCase();
                }
            });
        }


        const response = {
            is_success: true,
            user_id: USER_INFO.user_id,
            email: USER_INFO.email,
            roll_number: USER_INFO.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(), // Return sum as string
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error occurred while processing the request."
        });
    }
});

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        message: 'Message API working succesfully.'
    });
})


app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            "POST /bfhl": "Main API endpoint",
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        message: 'Something went wrong!'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;