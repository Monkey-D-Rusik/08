$(function () {

    $('.decor').each(function () {
        // Объявляем переменные (форма и кнопка отправки)
        var form = $(this),
            btn = $('.btn-sub'),
            check = false;

        // Добавляем каждому проверяемому полю, указание что поле пустое
        form.find('.field').addClass('empty_field');

        // Функция проверки полей формы
        function checkInput() {
            form.find('.field').each(function () {
                if ($(this).val() != '') {
                    // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('empty_field');
                } else {
                    // Если поле пустое добавляем класс-указание
                    $(this).addClass('empty_field');
                }
            });
        }

        // Функция подсветки незаполненных полей
        function lightEmpty() {
            form.find('.empty_field').css({ 'border': '#e66f6f 2px', 'box-shadow': '0 0 0 2px #e66f6f' });
            if(!check){
                form.find('label').css({'color': '#e66f6f'});
            }
            // Через полсекунды удаляем подсветку
            setTimeout(function () {
                form.find('.empty_field').removeAttr('style');
                form.find('label').removeAttr('style');
            }, 500);
        }


        $('#custom-checkbox').on('change', function () {
            if ($('#custom-checkbox').prop('checked')) {
                check = true;
            } else {
                check = false;
            }
        });
        // Проверка в режиме реального времени
        setInterval(function () {
            // Запускаем функцию проверки полей на заполненность
            checkInput();
            // Считаем к-во незаполненных полей
            var sizeEmpty = $('.empty_field').length;
            // Вешаем условие-тригер на кнопку отправки формы
            if (sizeEmpty === 0 && check) {
                if (btn.hasClass('active-btn')) {
                    return false;
                } else {
                    btn.addClass('active-btn');
                }
            } else {
                if(btn.hasClass('active-btn')){
                    btn.removeClass('active-btn');
                } else { 
                    return false;
                }
            }
        }, 500);

        // Событие клика по кнопке отправить
        btn.click(function () {
            if ($(this).hasClass('active-btn')) {
                // Все хорошо, все заполнено, отправляем форму
                if(checkValidity()){
                    form.submit();
                }
            } else {
                // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
                lightEmpty();
                return false
            }
        });
    });
});