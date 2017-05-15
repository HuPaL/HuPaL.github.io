<meta http-equiv="Content-Type" content="text/html"; charset="UTF-8" />
<?php

	if (isset($_POST['name'])) {$name = $_POST['name'];}
	if (isset($_POST['email'])) {$email = $_POST['email'];}
	if (isset($_POST['body'])) {$body = $_POST['body'];}



	// put your email here example "ivanov@email.com"
	$address = "";
	// 

	$mes = "Name: $name \n\nE-mail: $email \n\nMessage: \n\n$body";
	$send = mail ($address,"New Message",$mes,"Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
	
	if ($send == 'true')
		{ echo "Сообщение успешно отправлено";	}
	else
		{ echo "Ошибка, проверьте еще раз"; }
?>