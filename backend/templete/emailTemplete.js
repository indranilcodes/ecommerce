const otpTemplate = () => {
    return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Registration Confirmation Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container"> 

			<a href="https://apnabazar.cyclic.app"><img class="logo"
					src="https://i.ibb.co/WcwTwqd/apnabazarlogo.jpg" alt="Apna Bazar Logo"></a>

			<div class="message">Registration Confirmation  Email</div>

			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with ApnaBazar.com . Here our team always ready to assit you . here you can buy any product at the cheaper cost . here also some festival offers is available </p>
			</div>

			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:2021ugec091@nitjsr.ac.in">2021ugec091@nitjsr.ac.in</a>. We are here to help!</div>
		</div>

	</body>
	
	</html>`;
};

module.exports = otpTemplate;