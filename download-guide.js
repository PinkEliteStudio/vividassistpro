```javascript
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    // Parse the form data
    const body = JSON.parse(event.body);
    const { first_name, last_name, email, company_revenue, business_goals } = body;

    // Basic validation
    if (!first_name || !last_name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid input: First name, last name, and valid email are required' }),
      };
    }

    // Optionally send data to Salesforce Web-to-Lead
    try {
      await axios.post('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
        oid: '00Dfn000003U2iy',
        retURL: 'https://www.vividassistpro.com/thank-you.html',
        lead_source: 'Free Guide Download',
        Campaign_ID: '701fn0000012345',
        first_name,
        last_name,
        email,
        company_revenue,
        business_goals,
      });
    } catch (error) {
      console.error('Salesforce submission error:', error);
      // Continue to serve PDF even if Salesforce fails
    }

    // Path to the PDF file in the static/assets folder
    const filePath = path.join(__dirname, '../static/assets/VividAssistPro-FreeGuide-2025.pdf');

    // Read the PDF file
    const fileContent = await fs.readFile(filePath);

    // Return the PDF as a response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="VividAssistPro-FreeGuide-2025.pdf"',
      },
      body: fileContent.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
```
