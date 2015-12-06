var viewport 	= $(window);
var layout 		= $(document);

$().ready(function(){

	layout
	// check required fields
		.delegate('[required]','keyup change', function(e){
			var group = $(this).parents('.jsFormGroup');
			group.find('.jsError').slideUp('fast',function(){ group.removeClass('error'); });
			checkRequired( $(this) );
		})
	// only digits 
		.delegate('.jsOnlyDig','keypress',function(e){
			var key = e.which;
			if( key !=8 && key !=0 && ( key < 48 || key > 57 ) ) return false;
		})
	// disabled links
		.delegate('a.disabled','click',function(){
			return false;
		})
	// toggle
		.delegate('.jsLinkToggle','click',function(){
			$(this).parents('.jsToggleContainer').toggleClass('toggled');
			return false;
		});

	// table click
		$('.jsTableClick').find('tbody td').on('click',function(){
			var link 	= $(this).parents('tr').find('a');
			var url 	= link.attr('href');
			location.href = url;
		});

	// popovers
		var popoverTimer = null;
		$('.jsPopover').popover({ animation: false });
		$('.jsPopoverHover').popover({ animation: false });
		$('.jsPopoverHover')
			.on('mouseenter',function(){
				$('.jsPopoverHover').popover('hide');
				$(this).popover('show');
				clearTimeout(popoverTimer)
			})
			.on('mouseleave',function(){
				var div = $(this);
				popoverTimer = setTimeout(function(){ 
					if( !div.next('.popover').hasClass('hover') ) div.popover('hide');
					clearTimeout(popoverTimer);
				},150);
			})
			.on('shown.bs.popover', function(){
				var div = $(this);
				div.next('.popover')
					.on('mouseover',function(){ 
						$(this).addClass('hover'); 
					})
					.on('mouseleave',function(){ 
						$(this).removeClass('hover');
						div.popover('hide');
						clearTimeout(popoverTimer);
					});
			});

	// tooltips
		$('.jsTooltip').tooltip();
		
	// check required fields
		$('[required]').each(function(){ checkRequired( $(this) ); });

	// init masks
		if( $('.jsMask').length > 0 ){ initMasks(); }

	// load form-login events
		if( $('#jsFormLogin').length > 0 || $('#jsFormPassRecovery').length > 0 ){ loadFormLoginEvents(); }

	// init aside menu
		if( $('#jsSideNav').length > 0 ){ initSideMenu(); }

	// load train-table events
		if( $('.jsTrainTable').length > 0 ){ loadTrainTableEvents(); }

	// check anchors
		checkAnchors();

	// init datepickers
		if( $('.jsCalendarDate').length > 0 ){ initDatePickers(); }
	// load schedules-list events
		if( $('#jsSchedulesList').length > 0 ){ loadSchedulesListEvents(); }

});

// date_text format
	function date_text(calendar,calendar_inp){
		var date 	= calendar.datepicker('getDate');
		if( date != null ){
			var day 	= date.getDate();
			var month 	= $.datepicker.regional['ru'].monthNamesShort[date.getMonth()].toLowerCase();
			var week 	= $.datepicker.regional['ru'].dayNamesMin[date.getDay()];
			var text 	= day +' '+ month +', '+ week;
			calendar_inp.val( text );				
		}
	}

// load search-form events
	function loadSearchFormEvents(){
		var calendar 			= $('#jsCalendar');
		var calendar_inp 		= $('#jsCalendarInp');
		var date_from_inp 		= $('#jsInpFrom');
		var date_to_inp 		= $('#jsInpTo');
		var date_from_hidden 	= $('#FROM_STATION_LIST');
		var date_to_hidden 		= $('#TO_STATION_LIST');
		var btn_toggle 			= $('#jsBtnChangeDirection');
		var btn_submit 			= $('#jsBtnSubmit');
		var form 				= $('#jsSearchForm');
		var date 				= $('#jsCalendar');
		var checkEnableBtn = function(){
			var locations 	= date_from_hidden.val() > 0 && date_to_hidden.val() > 0;
			var enable 		= ( locations && date.val() != '' );
			form.find('.jsLocationTip').css('display', ( !locations ? 'inline-block' : 'none' ) )
			btn_submit.attr('disabled', !enable );
		};
		calendar.datepicker({
			numberOfMonths: 	2,
			firstDay: 			1,
			minDate: 			0,
			maxDate: 			"+45D",
			showCurrentAtPos: 	0,
			multiSeparator: 	'+',
			dateFormat: 		'dd.mm.yy',
			showOn: 			'button',
			buttonImageOnly: 	false,
			buttonText: 		'<i class="fa fa-calendar"></i>',
			onSelect: 	function(dateText,inst){
				date_text(calendar,calendar_inp);
				checkEnableBtn();
			},
  			beforeShow: function(input, inst) {
				var calendar_div = inst.dpDiv;
				setTimeout(function() {
					calendar_div.position({
						my: 'right top',
						at: 'right bottom',
						collision: 'none',
						of: input
					});
				}, 1);
			}															
		});
		date_text(calendar,calendar_inp);
		date_from_inp
			.on('keyup',function(){
				date_from_hidden.val(-1);
				checkEnableBtn();
			})
			.autocomplete({
				select: function( event, ui ) {
					alert("selected ui.item.id="+ui.item.id);
					date_from_hidden.val( ui.item.id );
					checkEnableBtn();
				}
			});
		date_to_inp
			.on('keyup',function(){
				date_to_hidden.val(-1);
				checkEnableBtn();
			})
			.autocomplete({
				select: function( event, ui ) {
					alert("selected ui.item.id="+ui.item.id);
					date_to_hidden.val( ui.item.id );
					checkEnableBtn();
				}
			});
		btn_toggle.on('click',function(){
			var from = date_from_hidden.val();
			var to 	 = date_to_hidden.val();
			var text_from 	= date_from_inp.val();
			var text_to		= date_to_inp.val();
			date_from_hidden.val( to );
			date_to_hidden.val( from );
			date_from_inp.val( text_to );
			date_to_inp.val( text_from );
		});

		var limit = parseInt( $('#jsMaxLimit').val(), 10 );

		var btn_tooltip = function(el){
			var btn 			= $(el);
			var group 			= btn.parents('.btn-group');
			var text 			= group.attr('data-tip-text');
			var disabled_btns	= group.find('.btn.disabled');
			group.parent('div').find('.jsPopover').remove();
			if( disabled_btns.length > 0 ){
				var width = 0;
				var left  = 0;
				disabled_btns.each(function(){ width += $(this).outerWidth(true); });
				group.find('.btn:not(.disabled)').each(function(){ left += $(this).outerWidth(true); });
				var tip = '<span style="width:'+ width +'px; left:'+ left +'px;" class="jsPopover btn-popover" data-html="true" data-trigger="hover" data-toggle="popover" data-placement="top" data-content="<p>'+ text +'</p>"></span>';
				group.before(tip);
				group.parent('div').find('.jsPopover').popover({ animation: false });
			}
		};

		var checkBaby = function(){
			$('#jsGroup_adult').find('.btn').each(function(){
				var btn 	= $(this);
				var number 	= parseInt( btn.attr('data-number'), 10 );
				var checked = btn.hasClass('active');
				var child 	= $('#jsGroup_baby').find('.btn').filter('[data-number="'+ number +'"]');
				child
					.removeClass('disabled')
					.addClass( ( !checked ? 'disabled' : '' ) )
					.children('input[type="checkbox"]').attr('disabled', !checked );
				if( !checked ) child.removeClass('active').children('input[type="checkbox"]').removeAttr('checked');
				btn_tooltip( child );
			});
		};

		var checkLimit = function(group){
			if( group == 'adult' || group == 'child' ){
				var group1 = $('#jsGroup_'+ group );
				var group2 = $('#jsGroup_'+ ( group == 'adult' ? 'child' : 'adult' ) );
				var group1_btns = group1.find('.btn').filter('.active').length;
				var group2_btns = group2.find('.btn');
				group2_btns.each(function(){
					var btn 	= $(this);
					var number 	= parseInt( btn.attr('data-number'), 10 );
					if( number > limit - group1_btns ) action( btn, 'disable' ); else action( btn, 'enable' );
					btn_tooltip( btn );
				});				
			}
		};

		var action = function(el,act){
			var btn 		= $(el);
			var group 		= btn.parents('.jsGroup');
			var number 		= parseInt( btn.attr('data-number'), 10 );
			var group_name 	= group.attr('data-group-name');
			var checkbox 	= btn.children('input[type="checkbox"]');
			if( group_name == 'adult' && number == 1 ) return false;
			switch(act){
				case 'select':
					btn.addClass('active');
					checkbox.attr('checked',true);
				break;
				case 'unselect':
					btn.removeClass('active');
					checkbox.removeAttr('checked');
				break;
				case 'enable':
					btn.removeClass('disabled');
					checkbox.removeAttr('disabled');
				break;
				case 'disable':
					btn.addClass('disabled');
					checkbox.attr({
						'disabled': true,
						'checked': 	false
					});
				break;
			}
		};

		$('.jsGroup').find('.btn').on('click',function(){
			var btn 	= $(this);
			var prev 	= btn.prevAll('.btn');
			var next 	= btn.nextAll('.btn').filter('.active');
			var checked = btn.hasClass('active');
			var group 		= btn.parents('.jsGroup');
			var group_name 	= group.attr('data-group-name');
			if( checked ){
				if( next.length > 0 ) $.each( next, function(i,btns){ action( btns, 'unselect' ); });
				else{
					action( btn,'unselect');
					if( prev.length > 0 ) $.each( prev, function(i,btns){ action( btns, 'unselect' ); });
				}
			}else{
				action( btn,'select');
				if( prev.length > 0 ) $.each( prev, function(i,btns){ action( btns, 'select' ); });
			}
			checkBaby();
			checkLimit(group_name);
			return false;
		});

		checkEnableBtn();
		checkBaby();
		checkLimit('adult');
		checkLimit('child');
	}

// load form-login events
	function loadFormLoginEvents(){
		var form_login 		= $('#jsFormLogin');

		var form_recovery 	= $('#jsFormPassRecovery');
		$('.jsLinkAuth').on('click',function(){
			var action 	= $(this).attr('data-action');
			var tab 	= ( action == 'login' ? 1 : 2 );
			$('.jsAuthTab'+ tab ).addClass('active').siblings('.jsAuthTab').removeClass('active');
			$('#modal-auth').modal('show');
			return false;
		});
		form_login
			.find('.jsLink').on('click',function(){
				form_login.hide().find('.form-control').val('');
				form_recovery
					.show()
					.find('.jsInp').removeAttr('required').end()
					.find('.jsStep1').show().end()
					.find('.jsStep2').hide();
				checkRequired();
				return false;
			});
		form_recovery
			.find('.jsLink').on('click',function(){
				form_recovery.hide().find('.form-control').val('');
				form_login.show();
				checkRequired();
				return false;
			}).end()
			.find('.jsBtn').on('click',function(){
				form_recovery
					.find('.jsInp').attr('required',true).end()
					.find('.jsStep1').hide().end()
					.find('.jsStep2').show();
				checkRequired();
			});
	}

// get num ending
	// getNumEnding( count,[' символ',' символа',' символов'] )
    function getNumEnding(iNumber, aEndings){
        var sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber>=11 && iNumber<=19) {
            sEnding=aEndings[2];
        }else{
            i = iNumber % 10;
            switch (i){
                case (1): sEnding = aEndings[0]; break;
                case (2):
                case (3):
                case (4): sEnding = aEndings[1]; break;
                default: sEnding = aEndings[2];
            }
        }
        return sEnding;
    }

// number format
	// number_format( num, 2, '.', ' ' )
    function number_format(number, decimals, dec_point, thousands_sep ) {
        var i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){ decimals = 2; }
        if( dec_point == undefined ){ dec_point = ","; }
        if( thousands_sep == undefined ){ thousands_sep = "."; }
        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
        if( (j = i.length) > 3 ){ j = j % 3; } else{ j = 0; }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        if (kd==".00")kd="";
        return km + kw + kd;
    }

// check required
	function checkRequired(el){
		var enable 	= true;
		var forms 	= ( typeof el != 'undefined' ? $(el).parents('.jsRequiredContainer') : $('.jsRequiredContainer') );
		forms.each(function(){
			var form = $(this);
			form
				.find('[required]')
					.filter('input[type="hidden"], input[type="text"], input[type="password"], input[type="email"], textarea')
						.each(function(){
							if( !$(this).val() ) enable = false;								
						}).end().end()
				.find('.jsRequiredSub')
					.each(function(){
						if( $(this).find('[required]').filter(':checked').length == 0 ) enable = false;
					}).end()
				.find('button,input[type="button"]').filter('[required]').attr('disabled', ( enable ? false : true ) );
				if( enable ) form.find('.jsRequiredTip').hide(); else form.find('.jsRequiredTip').show();			
		});
	}

// init masks 
	function initMasks(){
		$('.jsMask').filter(':not(.ready)').each(function(){
			var inp 	= $(this);
			var mask 	= inp.attr('data-mask');
			inp.mask( mask ).addClass('ready');
		});
	}

// init side menu
	function initSideMenu(){
		var div = $('#jsSideNav');
		var offset_top 		= div.offset().top - 35;
		var offset_bottom 	= $('#footer').height();
		div.affix({
			offset: {
				top: 	offset_top,
				bottom: function () {
					return ( this.bottom = offset_bottom )
				}
			}
		});
		$('body').scrollspy({
			target: '#jsSideNav',
			offset: 90
		});
		div.find('a').on('click',function(){
			var offset = $($(this).attr('href')).offset().top - 20;
			$('body,html').animate({scrollTop : offset },300);
			return false;
		});
	}

// check anchors
	function checkAnchors(){
		var url 	= location.href;
		var anchor 	= url.lastIndexOf('#');
		if( anchor > 0 ){
			anchor = url.substr(anchor);
			var target = $(anchor);
			if( target.length > 0 && target.is(':visible') ){
				var scroll = target.offset().top - 50;
				$('body,html').animate({scrollTop : scroll },300,function(){
					target.addClass('active');
				});
			}
		}
	}

// load train-table events
	function loadTrainTableEvents(){
		var table 	= $('.jsTrainTable');
		var body 	= table.find('tbody');
		var toggle  = function(el){
			var wagon 		= $(el).parents('tr');
			var wagon_form 	= wagon.next('.tr-toggle');
			if( wagon.hasClass('toggled') ){
				wagon.removeClass('toggled');
				wagon_form.hide();
			}else{
				wagon.addClass('toggled');
				wagon_form.show();
			}
		};
		table
			.find('tbody > tr > td,.jsLinkToggle').on('click',function(){
				toggle( $(this) );
				return false;
			});
	}

// init datepickers
	function initDatePickers(){
		$('.jsCalendarDate').each(function(){
			var picker 			= $(this);
			var calendar_inp 	= picker.parents('.datepicker-wrapper').children('.jsCalendarDateInp');
			var calendar = picker.datepicker({
				numberOfMonths: 	2,
				firstDay: 			1,
				minDate: 			0,
				maxDate: 			"+45D",
				showCurrentAtPos: 	0,
				multiSeparator: 	'+',
				dateFormat: 		'dd.mm.yy',
				showOn: 			'button',
				buttonImageOnly: 	false,
				buttonText: 		'<i class="fa fa-calendar"></i>',
				onSelect: 	function(dateText,inst){
					date_text( calendar, calendar_inp );
				},
	  			beforeShow: function(input, inst) {
					var calendar_div = inst.dpDiv;
					setTimeout(function() {
						calendar_div.position({
							my: 'right top',
							at: 'right bottom',
							collision: 'none',
							of: input
						});
					}, 1);
				}															
			});
			date_text( calendar, calendar_inp );
		});	
	}
// load schedules-list events
	function loadSchedulesListEvents(){
		var list  		= $('#jsSchedulesList').find('.jsScheduleItem');
		var checkboxes 	= $('.jsFilterCheckbox');
		list.each(function(){
			var item 	= $(this);
			var classes = '';
			if( !item.find('[data-wagon-type="general"]').hasClass('td-empty') ) 		classes += ' js_general';
			if( !item.find('[data-wagon-type="sedentary"]').hasClass('td-empty') ) 		classes += ' js_sedentary';
			if( !item.find('[data-wagon-type="second-class"]').hasClass('td-empty') ) 	classes += ' js_second-class';
			if( !item.find('[data-wagon-type="compartment"]').hasClass('td-empty') ) 	classes += ' js_compartment';
			if( !item.find('[data-wagon-type="soft"]').hasClass('td-empty') ) 			classes += ' js_soft';
			if( !item.find('[data-wagon-type="luxury"]').hasClass('td-empty') ) 		classes += ' js_luxury';
			item.addClass( classes );
		});
		var checkDisabled = function(){
			checkboxes.each(function(){
				var filter 		= $(this).attr('data-filter');
				var disabled 	= list.filter(':visible').filter('.'+ filter ).length == 0;
				$(this).attr('disabled', disabled ).parent('label').removeClass('disabled').addClass( ( disabled ? 'disabled' : '' ) );
			});
		};
		var filters = function(){
			var selected 	= checkboxes.filter(':checked');
			var classes 	= ' ';
			if( selected.length > 0 ){
				selected.each(function(){
					var checkbox = $(this);
					var filter 	 = checkbox.attr('data-filter');
					classes += '.'+ filter;
				});
				list.hide().filter( classes ).show();
			}else list.show();
			checkDisabled();
		};
		checkboxes.on('change',function(){ filters(); });
		filters();
	}        