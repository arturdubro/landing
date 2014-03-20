<?php
    if($_POST){
        $response = array('type'=>'', 'message'=>'');
        try{
        
        if(!isset($_POST['your_name']) || !isset($_POST['your_email']) || !isset($_POST['how_many']) || !isset($_POST['event_date'])) {
            throw new Exception('Кажется, возникла проблема с вашими данными. Попробуйте заполнить форму заявки еще раз.');
        }

        $email_to = "gromne@yandex.ru";
        $email_subject = "Заявка на мероприятие";

        $your_name = $_POST['your_name']; 
        $your_email = $_POST['your_email']; 
        $event_date = $_POST['event_date']; 
        $your_phone = $_POST['your_phone']; 
        $how_many = $_POST['how_many'];
        $reclaim_text = $_POST['reclaim_text'];

        $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
          
        if(!preg_match($email_exp,$your_email)) {
          throw new Exception('Введите корректный адрес почты.<br />');
        }
        $string_exp = "/^[А-Я]{2,12}$/iu";
        if(!preg_match($string_exp,$your_name)) {
          throw new Exception('Введите корректное имя.<br />');
        }
        $string_exp = "/^[0-9]{7,11}+$/";
        if(!preg_match($string_exp,$your_phone)) {
          throw new Exception('Номер телефона не должен содержать скобок, пробелов и дефисов. Только цифры.<br />');
        }
        $string_exp = "/^[0-9.\/]{8,10}+$/";
        if(!preg_match($string_exp,$event_date)) {
          throw new Exception('Проверьте дату проведения.<br />');
        }
        $string_exp = "/^[0-9]{1,3}+$/";
        if(!preg_match($string_exp,$how_many)) {
          throw new Exception('Необходимо указать число участников.<br />');
        }

        $email_message = "Заказчик указал следующие данные:\n\n";
          
        function clean_string($string) {
          $bad = array("content-type","bcc:","to:","cc:","href");
          return str_replace($bad,"",$string);
        }

        $email_message .= "Имя: ".clean_string($your_name)."\n";
        $email_message .= "Телефон: ".clean_string($your_phone)."\n";
        $email_message .= "Email: ".clean_string($your_email)."\n";
        $email_message .= "Количество участников: ".clean_string($how_many)."\n";
        $email_message .= "Дата проведения: ".clean_string($event_date)."\n"; 
        $email_message .= "Текст заявки: ".clean_string($reclaim_text)."\n"; 
        $headers = 'From: '.$your_email."\r\n".
        'Reply-To: '.$your_email."\r\n" .
        'X-Mailer: PHP/' . phpversion();
        @mail($email_to, $email_subject, $email_message, $headers);  

        $response['type'] = 'success';
        $response['message'] = 'Заявка отправлена, спасибо!';

        } catch(Exception $e) {
            $response['type'] = 'error';
            $response['message'] = $e->getMessage();
        }
        print json_encode($response);
        exit;
    }
?>