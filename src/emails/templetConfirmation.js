export const html =(token)=>{
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f7;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    text-align: center;
  }
  h1 {
    color: #333333;
    font-size: 24px;
  }
  p {
    color: #555555;
    font-size: 16px;
    line-height: 1.5;
  }
  .btn {
    display: inline-block;
    background-color: #4CAF50;
    color: #ffffff;
    text-decoration: none;
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20px;
  }
  .btn:hover {
    background-color: #45a049;
  }
  .footer {
    margin-top: 30px;
    font-size: 12px;
    color: #999999;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Verify Your Email</h1>
    <p>Hi dear</strong>,</p>
    <p>Thank you for signing up for Saraha App! Please verify your email address by clicking the button below:</p>
    <a class="btn" href="http://127.0.0.1:3000/api/v1/users/verify/${token}">Verify Email</a>
    <p>If you did not create an account, no further action is required.</p>
    <div class="footer">
      &copy; 2025 Saraha App. All rights reserved.
    </div>
  </div>
</body>
</html>
`
}