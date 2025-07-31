const path = require('path');
const fs = require('fs');

exports.handler = async (event, context) => {
  try {
    // Parse the email from the form submission
    const { email } = JSON.parse(event.body || '{}');
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Path to the PDF in the public directory
    const filePath = path.join(__dirname, '..', 'public', '5_AI_Powered_Strategies_Guide.pdf');
    if (fs.existsSync(filePath)) {
      const pdf = fs.readFileSync(filePath);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="5_AI_Powered_Strategies_Guide.pdf"',
        },
        body: pdf.toString('base64'), // Use base64 for PDF
        isBase64Encoded: true,
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'PDF not found' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' }),
    };
  }
};
