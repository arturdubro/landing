<?php
if(isset($_POST['your_email'])) {
  $email_to = "gromne@yandex.ru";
  $email_subject = "Заявка на мероприятие";
  
  function died($error) {
    echo "Форма заявки заполнена неверно";
    echo "Пожалуйста, исправьте данные ошибки и попробуйте заново.<br /><br />";
    echo $error."<br /><br />";
    die();
  }
  
  if(!isset($_POST['your_name']) || !isset($_POST['your_email']) || !isset($_POST['how_many']) || !isset($_POST['event_date'])) {
    died('Кажется, возникла проблема с вашими данными. Попробуйте заполнить форму заявки еще раз.');
  }

  $your_name = $_POST['your_name']; 
  $your_email = $_POST['your_email']; 
  $event_date = $_POST['event_date']; 
  $your_phone = $_POST['your_phone']; 
  $how_many = $_POST['how_many'];
  $reclaim_text = $_POST['reclaim_text'];
  $error_message = "";
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  
  if(!preg_match($email_exp,$your_email)) {
    $error_message .= 'Введите корректный адрес почты.<br />';
  }
  $string_exp = "/^[А-Я]{2,12}$/iu";
  if(!preg_match($string_exp,$your_name)) {
    $error_message .= 'Введите корректное имя.<br />';
  }
  $string_exp = "/^[0-9]{7,11}+$/";
  if(!preg_match($string_exp,$your_phone)) {
    $error_message .= 'Номер телефона не должен содержать скобок, пробелов и дефисов. Только цифры.<br />';
  }
  $string_exp = "/^[0-9.\/]{8,10}+$/";
  if(!preg_match($string_exp,$event_date)) {
    $error_message .= 'Проверьте дату.<br />';
  }
  $string_exp = "/^[0-9]{1,3}+$/";
  if(!preg_match($string_exp,$how_many)) {
    $error_message .= 'Необходимо указать только число участников.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
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
?>
Спасибо, ваша заявка принята.
<?php 
}
?>