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
        				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['name'].'</td>
        			</tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Как связаться</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['phone'].'</td>
              </tr>
              <tr>
        				<td style="padding: 10px; border: #e9e9e9 1px solid; width: 50%"><b>Порода дерева</b></td>
        				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['tree'].'</td>
        			</tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Покрытие</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['coating'].'</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Река</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['river'].'</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Подстолье</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['under'].'</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Ширина</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['width'].' см</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Длина</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['length'].' см</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Стоимость</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_POST['price'].' руб</td>
              </tr>
            </table>
          </body>
      </html>';
  $to = 'poluboiarov@gmail.com';
  $subject = 'Расчет стоимости стола';
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
  $headers .= "From: Отправитель <from@example.com>\r\n";
  mail($to, $subject, $message, $headers);
?>
