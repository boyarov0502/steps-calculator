<?
  $message = '
      <html>
          <head>
              <title>'.$subject.'</title>
          </head>
          <body>
            <table style="background-color: #f8f8f8; width: 400px">
              <tr>
        				<td style="padding: 10px; border: #e9e9e9 1px solid; width: 50%"><b>Как обращаться</b></td>
        				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['feedname'].'</td>
        			</tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Как связаться</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><a href="tel:'.$_POST['feednumber'].'">'.$_POST['feednumber'].'</a></td>
              </tr>
            </table>
          </body>
      </html>';
  $to = 'poluboiarov@gmail.com';
  $subject = 'Затрудняюсь ответить';
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
  $headers .= "From: Отправитель <from@example.com>\r\n";
  mail($to, $subject, $message, $headers);
?>
