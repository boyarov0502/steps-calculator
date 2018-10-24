$(document).ready(function () {

  // -----ЗАПУСК ШАГОВ И ВАЛИДАЦИЯ ФОРМЫ-----
  $form = $("#calc");
  $form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.parents('.form-child').find('.choose').addClass('error');
      element.siblings('.label').addClass('error');
    }
  });
  $form.steps({
    headerTag: "h3",
    bodyTag: "div",
    transitionEffect: "fade",
    titleTemplate: "<div class='title'><span class='number'>0#index# / </span><span class='text'>#title#</span></div>",
    onStepChanging: function (event, currentIndex, newIndex)
    {
      if (currentIndex == 5) {
        return true;
      }
      else {
        $nextStep = $(".form-child").eq(newIndex);
        $form.validate();
        if ($form.valid() == true) {
          $("p.choose.error").removeClass("error");
          $(".label.error").removeClass("error");
          if (($nextStep.find("input[type='radio']").is(":checked")) || (newIndex == 4) || (newIndex == 5)) {
            $("a[href='#next']").addClass('next');
            $("a[href='#previous']").removeClass('disabled');
          }
          else {
            $("a[href='#next']").removeClass('next');
            $("a[href='#previous']").addClass('disabled')
          }
          return true;
        }
        else
          return false;
      }
    },
    onFinishing: function (event, currentIndex)
    {
      $form.validate();
      if ($form.valid() == true) {
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: $form.serialize()
        }).done(function() {
         $('.form').html('<p class="done">Ваша заявка отправлена!</p>').show();
         $('a[href="#finish"]').parent().addClass('end');
         $('.again').show();
        })
      }
      else {
        console.log('Ошибка отправки!');
      }
    },
    labels: {
      current: "",
      finish: "Принять условия и отправить",
      next: "Следующий шаг",
      previous: "Назад",
      loading: "Загрузки..."
    }
  });

  // -----КНОПКА ПЕРЕЗАГРУЗКИ-----
  $('ul[role="menu"] li:nth-last-child(1)').after('<li class="again"><a href="#">Новый расчет</a></li>')
  $('.again a, .calc-toggle').click(function(){
    window.location.reload();
  });

  // -----СБОР ЗНАЧЕНИЙ-----
  function takeValues() {
    $length = $('input#length').val();
    $width = $('input#width').val();
    $treeN = $('input[name=tree]:checked').val();
    $treeP = $('input[name=tree]:checked').attr('data-price');
    $coatingN = $('input[name=coating]:checked').val();
    $coatingP = $('input[name=coating]:checked').attr('data-price');
    $riverN = $('input[name=river]:checked').val();
    $riverP = $('input[name=river]:checked').attr('data-price');
    $underN = $('input[name=under]:checked').val();
    $underP = $('input[name=under]:checked').attr('data-price');
  }

  // -----ВЫВОД ЗНАЧЕНИЙ-----
  function consoleLog() {
    $lengthLog = 'Длина ' + $length + ' см';
    $widthLog = 'Ширина ' + $width + ' см';
    $treeLog = $treeN;
    $coatingLog = $coatingN;
    $riverLog = $riverN;
    $underLog = $underN;
  }

  // -----ФОРМУЛА РАСЧЕТА----
  function calculated() {
    $step_1 = parseInt($treeP) + parseInt($coatingP);
    $step_2 = parseInt($riverP) * (parseFloat($length) / 100);
    $step_3 = parseFloat($width) * parseFloat($length) / 10000;
    $step_4 = $step_1 * $step_3;
    $step_5 = $step_2 + $step_4;
    $step_6 = $step_5 + parseInt($underP);

    // -----ПОДРОБНЫЙ РАСЧЕТ-----
    function valuation() {
      $('.length').text($lengthLog);
      $('.width').text($widthLog);
      $('.tree').text($treeLog);
      $('.coating').text($coatingLog);
      $('.river').text($riverLog);
      $('.under').text($underLog);
      $('#final_price').html(parseInt($step_6));
      $('input[name=price]').val(parseInt($step_6));
    }
    valuation();
  }

  $('#calc input[type="radio"], #calc input.param').change(function () {
    takeValues();
    consoleLog();
    calculated();
  });

  takeValues();
  consoleLog();
  calculated();

  // -----ЗАМЕНА ИЗОБРАЖЕНИЙ И ОПИСАНИЯ-----
  $box = $('div.box');
  $boxInfo = $('div.box-info');
  $caption = $('p.caption-info');
  $descript = $('p.descript-info');
  $next = $('a[href="#next"]');
  $back = $('a[href="#previous"]');

  $box.each(function (index) {
    $(this).find("input[type='radio']").on("click", function () {
      $next.addClass('next');
      $back.removeClass('disabled');
      if ($boxInfo.eq(index).children('.image').is('img') == false)
        $boxInfo.eq(index).prepend("<img class='image' src='" + $(this).data('image') + "'>")
      else
        $boxInfo.eq(index).children('.image').attr('src', $(this).data('image'));
      $caption.eq(index).text($(this).next().find("p.caption").html());
      $descript.eq(index).text($(this).next().find("p.descript").html());
    });
  });

  // -----ВЫВОД ПОДСКАЗОК-----
  $conteiner = $("span.text");
  $hover = $(".quest");
  $popup = ".answer";
  $conteiner.each(function(index) {
    $(this).children($hover).mouseenter(function(){
    	$(this).siblings($popup).fadeIn( 200 );
  	});
  });
  $conteiner.each(function(index) {
    $(this).children($hover).mouseleave(function(){
    	$(this).siblings($popup).fadeOut( 200 );
  	});
  });

  // -----УДАЛЕНИЕ НЕНУЖНЫХ ТЕГОВ-----
  $(".content > h3").remove();

  // -----ВВОД ЧИСЕЛ С ПАРАМЕТРАМИ-----
  $('input.param').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
  });

  // -----ПРОПУСК-----
  $('a.enter').on("click", function () {
    $('#intro').fadeOut(150);
    setTimeout(function () {$('#content').fadeIn(200)}, 150);
  })

  // -----ФОРМА ПЕРЕЗВОНА-----
  $("#feednumber").mask("+7(999) 999-9999");
  $('#feed input[name=submit]').on("click", function (e) {
    e.preventDefault();
    $('#feed').validate({
      messages: {
        feedname: "",
        feednumber: ""
      }
    });
    if ($('#feed').valid() == true) {
      $.ajax({
        type: 'POST',
        url: 'feed.php',
        data: $('#feed').serialize()
      }).done(function() {
       $('#feed').html('<p>Отправлено! Ждите звонка.</p>');
       setTimeout(function(){
         $("#overlay").trigger("click");
       }, 2000);
      })
    }
    else {
      console.log('Форма не отправлена!');
    }
  })

  // -----МОДАЛЬНОЕ ОКНО-----
  $modal = $('.modal');
  $openModal = $('.open-modal');
  $overlay = $('#overlay');
  $close = $('.modal-close, #overlay');

  $openModal.click( function(event){
    $div = $(this).attr('href');
    $overlay.fadeIn(400, function(){
      $($div).css('display', 'block').animate({opacity: 1, top: '0'}, 200);
      var scrollSuccess = $('body').offset().top;
			$('html, body').animate({scrollTop: scrollSuccess}, 600);
		});
  });

  $close.click( function(){
    $modal.animate({opacity: 0, top: '45%'}, 200, function(){
        $(this).css('display', 'none');
        $overlay.fadeOut(400);
      }
    );
  })

});
