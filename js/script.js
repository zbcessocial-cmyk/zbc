const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

$(window).on('load', function() {
    // Задержка 1 секунда перед добавлением класса, чтобы видео стало видимым
    setTimeout(function() {
      $('#hero-video').addClass('video-visible'); // Делаем видео видимым
      if ($('#hero-video')[0]) $('#hero-video')[0].play(); // Запускаем видео
    }, 1000); // 1 секунда задержки
  });






/**3 d carousel */
// Based on a Pen by Russell *ttps://codepen.io/Pycb/pen/wWRrjg*
//Using Jquery 'Cascade Slider jQuery Plugin' by jqueryscript.net 'https://www.jqueryscript.net/demo/Minimal-3D-Image-Rotator-with-jQuery-CSS3-Cascade-Slider/'
(function($) {
    $.fn.cascadeSlider = function(opt) {
      var $this = this,
        itemClass = opt.itemClass || 'cascade-slider_item',
        arrowClass = opt.arrowClass || 'cascade-slider_arrow',
        $item = $this.find('.' + itemClass),
        $arrow = $this.find('.' + arrowClass),
        itemCount = $item.length;
  
      var defaultIndex = 0;
  
      changeIndex(defaultIndex);
  
      $arrow.on('click', function() {
        var action = $(this).data('action'),
          nowIndex = $item.index($this.find('.now'));
  
        if(action == 'next') {
          if(nowIndex == itemCount - 1) {
            changeIndex(0);
          } else {
            changeIndex(nowIndex + 1);
          }
        } else if (action == 'prev') {
          if(nowIndex == 0) {
            changeIndex(itemCount - 1);
          } else {
            changeIndex(nowIndex - 1);
          }
        }
  
        $('.cascade-slider_dot').removeClass('cur');
        //$('.cascade-slider_dot').next().addClass('cur');
      });
      
      // add data attributes
      for (var i = 0; i < itemCount; i++) {
        $('.cascade-slider_item').each(function(i) {
          $(this).attr('data-slide-number', [i]);
        });
      }
      
      // dots
      $('.cascade-slider_dot').bind('click', function(){
        // add class to current dot on click
        $('.cascade-slider_dot').removeClass('cur');
        $(this).addClass('cur');
  
        var index = $(this).index();
  
        $('.cascade-slider_item').removeClass('now prev next');
        var slide = $('.cascade-slider_slides').find('[data-slide-number=' + index + ']');
        slide.prev().addClass('prev');
        slide.addClass('now');
        slide.next().addClass('next');
  
        if(slide.next().length == 0) {
          $('.cascade-slider_item:first-child').addClass('next');
        }
  
        if(slide.prev().length == 0) {
          $('.cascade-slider_item:last-child').addClass('prev');
        }
      });
  
      function changeIndex(nowIndex) {
        // clern all class
        $this.find('.now').removeClass('now');
        $this.find('.next').removeClass('next');
        $this.find('.prev').removeClass('prev');
        if(nowIndex == itemCount -1){
          $item.eq(0).addClass('next');
        }
        if(nowIndex == 0) {
          $item.eq(itemCount -1).addClass('prev');
        }
  
        $item.each(function(index) {
          if(index == nowIndex) {
            $item.eq(index).addClass('now');
          }
          if(index == nowIndex + 1 ) {
            $item.eq(index).addClass('next');
          }
          if(index == nowIndex - 1 ) {
            $item.eq(index).addClass('prev');
          }
        });
      }
    };
  })(jQuery);
  
  $('#cascade-slider').cascadeSlider({
    itemClass: 'cascade-slider_item',
    arrowClass: 'cascade-slider_arrow'
  });
/* */

$(document).ready(function () {
  // Получаем текущую дату
  const now = new Date();

  // Получаем последний день текущего месяца: создаём дату 1-го числа следующего месяца и вычитаем 1 день
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  // Устанавливаем время на 23:59:59
  lastDayOfMonth.setHours(23, 59, 59, 999);

  const targetDate = lastDayOfMonth.getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      $(".countdown").html("<h2>Событие наступило!</h2>");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    $("#days").text(days);
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});



///Count up
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,
		to: 0,
		speed: 1000,
		refreshInterval: 100,
		decimals: 0,
		formatter: formatter,
		onUpdate: null,
		onComplete: null
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
	// custom formatting
	$('.count-number').data('countToOptions', {
		formatter: function (value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	});

	// intersection observer
	const observer = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				const el = $(entry.target);
				// запускаем каунт только один раз
				if (!el.hasClass('counted')) {
					el.addClass('counted');
					const options = $.extend({}, el.data('countToOptions') || {});
					el.countTo(options);
				}
				observer.unobserve(entry.target); // остановим наблюдение
			}
		});
	}, {
		threshold: 0.5 // запускать, когда хотя бы 50% видно
	});

	// назначаем всем .timer
	document.querySelectorAll('.timer').forEach((el) => observer.observe(el));
});

// Window coloring
// const COLOR_BTNS = document.querySelectorAll('.color');
// COLOR_BTNS.forEach(color => {
//     color.addEventListener('click', () => {
//         let colorNameClass = color.className;
//         if(!color.classList.contains('active-color')){
//             let colorName = colorNameClass.slice(colorNameClass.indexOf('-') + 1, colorNameClass.length);
//             resetActiveBtns();
//             color.classList.add('active-color');
//             setNewColor(colorName)
//         }
//     });
// })

// // resetting all color btns
// function resetActiveBtns(){
//     COLOR_BTNS.forEach(color => {
//         color.classList.remove('active-color');
//     });
// }

// // set new color on the banner right 
// function setNewColor(color){
//     document.querySelector('.banner-right img').src = `images/colors/tshirt_${color}.png`;
// }
const COLOR_BTNS = document.querySelectorAll('.color');
let currentColor = 'white';
let isShutterClosed = false; // false — без жалюзей, true — с жалюзями

// Функция сброса активного цвета
function resetActiveBtns() {
  COLOR_BTNS.forEach(color => {
    color.classList.remove('active-color');
  });
}

// Функция установки нового цвета (с учётом состояния жалюзей)
function setNewColor(color) {
  currentColor = color;

  const img = document.querySelector('.banner-right img');
  let path = `./images/colors/window_${color}`;

  if (isShutterClosed) {
    path = `./images/colors/closed/window_${color}_closed`;
  }

  // Добавляем класс fade-out
  img.classList.add('fade-out');

  // Ждём завершения анимации исчезновения
  setTimeout(() => {
    img.src = `${path}.png`;

    // Когда картинка загрузится — показываем с fade-in
    img.onload = () => {
      img.classList.remove('fade-out');
    };
  }, 200); // время немного меньше чем transition (0.5s) — 300ms нормально
}


// Функция переключения состояния жалюзи
function toggleShutters() {
  isShutterClosed = !isShutterClosed;

  // Обновление кнопки
  const toggleBtn = document.getElementById('toggleShutters');
  toggleBtn.textContent = isShutterClosed ? 'Blinders Off' : 'Blinders On';

  // Переотрисовка изображения с тем же цветом
  setNewColor(currentColor);
}

// Навешиваем события
COLOR_BTNS.forEach(btn => {
  btn.addEventListener('click', () => {
    resetActiveBtns();
    btn.classList.add('active-color');
    const color = btn.classList[1].replace('color-', '');
    setNewColor(color);
  });
});

const toggleShuttersBtn = document.getElementById('toggleShutters');
if (toggleShuttersBtn) {
  toggleShuttersBtn.addEventListener('click', toggleShutters);
}



  function matchHeights() {
    const leftCol = document.querySelector('.hero-text-col');
    const form = document.querySelector('.card-form');

    if (leftCol && form) {
      const height = leftCol.offsetHeight;
      form.style.height = height + 'px';
    }
  }

  // Выполнить при загрузке страницы
  window.addEventListener('load', matchHeights);
  // Повторить при изменении размера окна
  window.addEventListener('resize', matchHeights);