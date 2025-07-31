const path = require('path');
const fs = require('fs');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '..', '..', 'static', 'assets', '5_AI_Powered_Strategies_Guide.pdf');
  if (fs.existsSync(filePath)) {
    const pdf = fs.readFileSync(filePath);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="5_AI_Powered_Strategies_Guide.pdf"',
      },
      body: pdf.toString('binary'),
      isBase64Encoded: true,
    };
  } else {
    return {
      statusCode: 404,
      body: 'PDF not found',
    };
  }
};
