(itj_isac = function() {
  

  //=============== PLUGIN URL =============== //
  /* It's only for shorten the string. It is data send directly from .php file. */
  itj_isac.plugin_url = itj_isac_plugin_url_data.plugin_url;
 
  
  //=============== PLUGIN SETTING FUNCTIONS =============== //
  
  //--- DISABLE & ENABLE FUNCTIONS --- //
  /* Function defining (visual) way to disable elements */
  itj_isac.set_element_disabled = function (disabled, elementSelector){
    var element = jQuery(elementSelector); 
    if (disabled) {
      element.attr('disabled', 'disabled');
      element.addClass('mce-disabled');
      element.prev().addClass('mce-disabled');
      element.find('button').attr('disabled', 'disabled');
      if (elementSelector === '#available_options-t'){
       jQuery(['0', '1', '2'].map(function(n) {return elementSelector + n}).join(', ')).addClass('itj_disabled_tab');
      }
    } else {
      element.removeAttr('disabled');
      element.removeClass('mce-disabled');
      element.prev().removeClass('mce-disabled');
      element.find('button').removeAttr('disabled');
      if (elementSelector === '#available_options-t'){
        jQuery(['0', '1', '2'].map(function(n) {return elementSelector + n}).join(', ')).removeClass('itj_disabled_tab'); 
      }
    }
  }
  
  /* All form controls names which depends on mutual on/off logic */
  /* they are options of shortcode (return to post content on return_all option), unless they wasn't disabled */
  itj_isac.all_names = {
      pre_form: 'pre_form', available_options: 'available_options', basic_options: 'basic_options',
      category_nested_listbox: 'category_nested_listbox', all_or_current_listbox: 'all_or_current_listbox',
      category_as_link_radio: 'category_as_link_radio', category_description_radio: 'category_description_radio', category_count_radio: 'category_count_radio',
      post_display_radio: 'post_display_radio', post_as_link_radio: 'post_as_link_radio', post_digest_radio: 'post_digest_radio', category_markup_listbox: 'category_markup_listbox',
      advanced_options: 'advanced_options', category_name_listbox: 'category_name_listbox', template_name_text: 'template_name_text',
      no_post_text: 'no_post_text', post_digest_length: 'post_digest_length', orderby: 'orderby',
      order: 'order', include: 'include', exclude: 'exclude',
      exclude_tree: 'exclude_tree', itj_slug: 'itj_slug', child_of: 'child_of',
      itj_parent: 'itj_parent', more_advanced_options: 'more_advanced_options', pre_whole_text: 'pre_whole_text', after_whole_text: 'after_whole_text',
      pre_posts_text: 'pre_posts_text', wrap_post_listbox: 'wrap_post_listbox', number: 'number',
      itj_name: 'itj_name', childless: 'childless', categories_class: 'categories_class',
      posts_class: 'posts_class', digests_class: 'digests_class', programmer_options: 'programmer_options',
      ignore_all:'ignore_all', return_all: 'return_all',
      page_as_link_radio: 'page_as_link_radio', page_description_radio: 'page_description_radio', page_markup_listbox: 'page_markup_listbox',
      containers: 'mce-container-text', itj_disable_tab: 'available_options-t'
  };
  
  /* Set of rules to control disabling - how check to disable */
  itj_isac.control_disabling_rules_set = {
      ignore_all_checked : function() {
      return jQuery('#' + itj_isac.all_names.ignore_all).hasClass('mce-checked');
    },
    category_nested_listbox_not_all_selected : function() {
       return jQuery('#'+ itj_isac.all_names.category_nested_listbox + ' button .mce-txt').text() !== "all";
    },
    category_name_listbox_not_template_name_selected : function() {
      return jQuery('#'+ itj_isac.all_names.category_name_listbox + ' button .mce-txt').text() !== "Your template name";
    },
    include_not_empty : function() {
      var include_val = jQuery('#' + itj_isac.all_names.include).val();
      if(include_val !== undefined){
        return include_val.trim().length > 0;
      } else {
    	return false;
      }
    }
  };

  /* Settings to control disabling - when check to disable and what disable */
  // with format control_disabling_settings[WHERE_LOOK_FOR_CONTROLS.CONTROL_NAME] = [WHERE_LOOK_FOR_DISABLING_RULE.NAME_OF_RULE];
  itj_isac.control_disabling_settings = (function(){
      var control_disabling_settings = {};
      control_disabling_settings[itj_isac.all_names.available_options] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.basic_options] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.category_nested_listbox] = [
                                                itj_isac.control_disabling_rules_set.ignore_all_checked
                                                ];
      control_disabling_settings[itj_isac.all_names.all_or_current_listbox] = [
                                               itj_isac.control_disabling_rules_set.ignore_all_checked
                                               ];
      control_disabling_settings[itj_isac.all_names.category_as_link_radio] = [
                                               itj_isac.control_disabling_rules_set.ignore_all_checked
                                               ];
      control_disabling_settings[itj_isac.all_names.category_description_radio] = [
                                                   itj_isac.control_disabling_rules_set.ignore_all_checked
                                                   ];
      control_disabling_settings[itj_isac.all_names.category_count_radio] = [
                                             itj_isac.control_disabling_rules_set.ignore_all_checked
                                             ];
      control_disabling_settings[itj_isac.all_names.post_display_radio] = [
                                           itj_isac.control_disabling_rules_set.ignore_all_checked,
                                           itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                           ];
      control_disabling_settings[itj_isac.all_names.post_as_link_radio] = [
                                           itj_isac.control_disabling_rules_set.ignore_all_checked,
                                           itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                           ];
      control_disabling_settings[itj_isac.all_names.post_digest_radio] = [
                                               itj_isac.control_disabling_rules_set.ignore_all_checked,
                                               itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                               ];
      control_disabling_settings[itj_isac.all_names.category_markup_listbox] = [
                                                    itj_isac.control_disabling_rules_set.ignore_all_checked
                                                    ];
      control_disabling_settings[itj_isac.all_names.advanced_options] = [
                                         itj_isac.control_disabling_rules_set.ignore_all_checked
                                         ];
      control_disabling_settings[itj_isac.all_names.category_name_listbox] = [
                                              itj_isac.control_disabling_rules_set.ignore_all_checked
                                              ];
      control_disabling_settings[itj_isac.all_names.template_name_text] = [
                                           itj_isac.control_disabling_rules_set.ignore_all_checked,
                                           itj_isac.control_disabling_rules_set.category_name_listbox_not_template_name_selected
                                           ];
      control_disabling_settings[itj_isac.all_names.no_post_text] = [
                                     itj_isac.control_disabling_rules_set.ignore_all_checked,
                                     itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                     ];
      control_disabling_settings[itj_isac.all_names.post_digest_length] = [
                                           itj_isac.control_disabling_rules_set.ignore_all_checked,
                                           itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                           ];
      control_disabling_settings[itj_isac.all_names.orderby] = [
                                     itj_isac.control_disabling_rules_set.ignore_all_checked
                                     ];
      control_disabling_settings[itj_isac.all_names.order] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.include] = [
                                     itj_isac.control_disabling_rules_set.ignore_all_checked
                                     ];
      control_disabling_settings[itj_isac.all_names.exclude] = [
                                     itj_isac.control_disabling_rules_set.ignore_all_checked,
                                     itj_isac.control_disabling_rules_set.include_not_empty
                                     ];
      control_disabling_settings[itj_isac.all_names.exclude_tree] = [
                                          itj_isac.control_disabling_rules_set.ignore_all_checked,
                                          itj_isac.control_disabling_rules_set.include_not_empty
                                          ];
      control_disabling_settings[itj_isac.all_names.itj_slug] = [
                                  itj_isac.control_disabling_rules_set.ignore_all_checked
                                  ];
      control_disabling_settings[itj_isac.all_names.child_of] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.itj_parent] = [
                                    itj_isac.control_disabling_rules_set.ignore_all_checked
                                    ];
      control_disabling_settings[itj_isac.all_names.more_advanced_options] = [
                                              itj_isac.control_disabling_rules_set.ignore_all_checked
                                              ];
      control_disabling_settings[itj_isac.all_names.pre_whole_text] = [
                                       itj_isac.control_disabling_rules_set.ignore_all_checked
                                       ];
      control_disabling_settings[itj_isac.all_names.after_whole_text] = [
                                                                   itj_isac.control_disabling_rules_set.ignore_all_checked
                                                                   ];
      control_disabling_settings[itj_isac.all_names.pre_posts_text] = [
                                       itj_isac.control_disabling_rules_set.ignore_all_checked,
                                       itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                       ];
      control_disabling_settings[itj_isac.all_names.wrap_post_listbox] = [
                                          itj_isac.control_disabling_rules_set.ignore_all_checked,
                                          itj_isac.control_disabling_rules_set.category_nested_listbox_not_all_selected
                                          ];
      control_disabling_settings[itj_isac.all_names.number] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.itj_name] = [
                                  itj_isac.control_disabling_rules_set.ignore_all_checked
                                  ]; 
      control_disabling_settings[itj_isac.all_names.childless] = [
                                        itj_isac.control_disabling_rules_set.ignore_all_checked
                                        ];
      control_disabling_settings[itj_isac.all_names.categories_class] = [
                                         itj_isac.control_disabling_rules_set.ignore_all_checked
                                         ];
      control_disabling_settings[itj_isac.all_names.posts_class] = [
                                      itj_isac.control_disabling_rules_set.ignore_all_checked
                                      ];
      control_disabling_settings[itj_isac.all_names.digests_class] = [
                                     itj_isac.control_disabling_rules_set.ignore_all_checked
                                     ];
      control_disabling_settings[itj_isac.all_names.containers] = [
                                           itj_isac.control_disabling_rules_set.ignore_all_checked
                                           ];
      control_disabling_settings[itj_isac.all_names.itj_disable_tab] = [
                                                               itj_isac.control_disabling_rules_set.ignore_all_checked
                                                               ];
      return control_disabling_settings;
  })();
  
  /* Apply disabling rule - check if rules are fulfil or not */
  itj_isac.apply_disabling_rules = function (ruleset, selectorForNameFn) {
    for (var name in ruleset) {
      var rules = ruleset[name];
      var disable = false;
      for (var ruleNo in rules) {
        disable = disable || rules[ruleNo]()
      }
      itj_isac.set_element_disabled(disable, selectorForNameFn(name));
    }
  };
  
  
  itj_isac.all_options_defaults = (function(){
      var all_options_defaults = {};
      all_options_defaults[itj_isac.all_names.category_nested_listbox] = 'nested2'; 
      all_options_defaults[itj_isac.all_names.all_or_current_listbox] = 'current';
      all_options_defaults[itj_isac.all_names.category_as_link_radio] = 'yes';
      all_options_defaults[itj_isac.all_names.category_description_radio] = 'no';
      all_options_defaults[itj_isac.all_names.category_count_radio] = 'no';
      all_options_defaults[itj_isac.all_names.post_display_radio] = 'yes';
      all_options_defaults[itj_isac.all_names.post_as_link_radio] = 'yes';
      all_options_defaults[itj_isac.all_names.post_digest_radio] = 'no';
      all_options_defaults[itj_isac.all_names.category_markup_listbox] = 'mixed_list';
      all_options_defaults[itj_isac.all_names.category_name_listbox] = 'only_name';
      all_options_defaults[itj_isac.all_names.template_name_text] = 'Category: ';
      all_options_defaults[itj_isac.all_names.no_post_text] = 'There are no posts in the category.';
      all_options_defaults[itj_isac.all_names.post_digest_length] = '100'; 
      all_options_defaults[itj_isac.all_names.orderby] = 'name';
      all_options_defaults[itj_isac.all_names.order] = 'ascending'; 
      all_options_defaults[itj_isac.all_names.wrap_post_listbox] = 'unordered_list';
      all_options_defaults[itj_isac.all_names.childless] = 'no'; 
      // If default value is absent here, then it is an empty string.
      return all_options_defaults;
  })();


  itj_isac.get_default_value_for_field = function(field_id) {
    return itj_isac.all_options_defaults[field_id] || '';
  }


  /* Make jQuery (like css) selector from form control name */
  itj_isac.commonSelectorMakerFN = function (name) {
    return (name === 'mce-container-text') ? ("." + name): ("#" + name);
  };
  
  /* Return only enabled options of shortcode (to post content) with setting */
  /* also remove prefix itj_ when needed */
  itj_isac.getEnabledOptions = function(data, selectorProducer) {
    var enabledOptions = [];
    var returnAll = jQuery('#' + itj_isac.all_names.return_all).hasClass('mce-checked');
    for (var option in data) {
      if (!jQuery(selectorProducer(option)).hasClass('mce-disabled') && (itj_isac.all_names[option] === option)
          && (returnAll || data[option] != itj_isac.get_default_value_for_field(option))) {
          enabledOptions.push(option.replace('itj_','') + '="' + data[option] + '"');
      }
    };
    return enabledOptions.join(' ');
  };
 
  //--- STYLING FUNCTIONS --- //
  //view styles - css, positioning, toggle etc.
  
  /* Toggle 'radio' buttons between yes and no - TinyMCE doesn't support radio buttons (buttons where you can chose only one from group)
   * so I decided to toggle one button between two options. More options are in listbox (BTW: there you can chose only one from group). Somehow it was logical for me.  */
  itj_isac.toggle_button = function(button, editor) {
    button.state.data.text = button.state.data.value = (button.state.data.value === "yes") ? "no" : "yes";
    jQuery(button.getEl()).find(".mce-txt").text(
        button.state.data.text    
    );
    if (button.state.data.text == "yes") {
      jQuery(button.getEl()).removeClass('mce-itj_button_off');
      jQuery(button.getEl()).addClass('mce-itj_button_on');
    } else if (button.state.data.text == "no") {
      jQuery(button.getEl()).removeClass('mce-itj_button_on');
      jQuery(button.getEl()).addClass('mce-itj_button_off');
    } else {
      alert('The appearance of the buttons does not work.')
    };   
  };
 
  /* Position listbox pop up (options) simply beneath last clicked option. It is fixed for my not-absolute positioning modal window.  */
  itj_isac.position_listbox = function(listbox, editor) {
    jQuery('#insert_sub_and_category').siblings('.mce-menu').not(":hidden").css({"left": jQuery(listbox.getEl()).offset().left});
  };
  
  /* Helps resizing modal window in right way: if height of viewport is bigger than modal window, *
   * change max-height of modal window and move foot with OK/Cancel buttons on bottom of this (by adding class). *
   * Overflow auto should get only options, so options tabs & OK/Cancel buttons can be on always visible. */
  itj_isac.resizeHandler = function () {
    var optionsHead = jQuery('#available_options-head div');
    var optionsHeadOffsetBottom = optionsHead.offset().top + optionsHead.height();
    
    var optionsContainer = jQuery('#available_options-body');
	  var footContainer = jQuery('#insert_sub_and_category .mce-foot.mce-container');
	  var modalWindow = jQuery('#insert_sub_and_category');
	  var modalWindowWidth;
	  var optionColumn = jQuery('#basic_options .mce-formitem, #advanced_options .mce-formitem, #more_advanced_options .mce-formitem');
	  
	  if (jQuery(window).width()<970) {
	    modalWindowWidth = 520;
	    optionColumn.addClass('oneColumn');
	    optionColumn.removeClass('twoColumns');
	    optionColumn.removeClass('bigColumns');
	  }else if (jQuery(window).width()>1920) {
	    modalWindowWidth = 1920;
	    optionColumn.removeClass('oneColumn');
      optionColumn.removeClass('twoColumns');
      optionColumn.addClass('bigColumns');
	  } else {
	    modalWindowWidth = '90%';
	    optionColumn.removeClass('oneColumn');
      optionColumn.addClass('twoColumns');
      optionColumn.removeClass('bigColumns');
	  };
	  
	  //height: auto doesn't count fixed footContainer. In max-height - subtract little more.
	  modalWindow.css({'height': 'auto', 'padding-bottom' : footContainer.height(), 'max-height': ( jQuery(window).height() - 50 )});	  
	  modalWindow.css({'width': modalWindowWidth, 'overflow': 'hidden'});
	  
	  optionsContainer.css('max-height','');
    //modalWindow padding cause subtract footContainer.height(),
	  optionsContainer.css({'max-height': footContainer.offset().top - optionsHeadOffsetBottom + footContainer.height(), 'overflow-x': 'hidden'});
	  
	  
	  //it calculates how far from left & top should be modalWindow on start (before manualy dragged)   
	  if (!modalWindow.hasClass('dragged')) {
	    modalWindow.css({'left': Math.max((jQuery(window).width() - modalWindow.width())/2, 0) + 'px', 'top': '1em'});
	  }	  
	  
	};
	

	
	itj_isac.resizeModal = function () {
	  var optionsContainer = jQuery('#available_options-body');
    var optionsHead = jQuery('#available_options-head');
    var optionsHeadOffsetBottom = optionsHead.offset().top + optionsHead.height();
    var footContainer = jQuery('#insert_sub_and_category .mce-foot.mce-container');
    
    optionsContainer.css('max-height','');
    optionsContainer.css('max-height', footContainer.offset().top - optionsHeadOffsetBottom - footContainer.height());
	};
	
	itj_isac.activateMove = function () {
	  jQuery('#insert_sub_and_category').addClass('dragged');
	};
	
	/* Apply resizing function when modal window shows for first time and recalculate after change options tab (level). Timeout is for apply after all scripts (f.e. TinyMCE absolute positioning scripts)*/
	itj_isac.timeoutResizeHandler = function () {
    setTimeout(function(){
      itj_isac.resizeHandler();              
    },10);
  };
  
   
  
  //=============== PLUGIN REGISTER & ADD =============== //

  //--- REGISTER PLUGIN --- //
  
  /* Register plugin in TinyMCE editor */
  tinymce.create('tinymce.plugins.MyButtons', {
    init : function(editor, url) {
      /* Add plugin button */
      
      editor.addButton('insert_sub_and_category_button', {
        title : 'Insert categories',
        image : itj_isac.plugin_url + 'img/button.svg',
        onclick : function() {
          
          /* determines what opens after click on button */
          editor.windowManager.open({
            title : 'Insert categories options',
            id: 'insert_sub_and_category',
          
            /* !!! PLUGIN BODY !!! */
            body: [
              {title: 'Summary form', type: 'tabpanel', id: 'available_options',                    
              items: [
                {title: 'Basic options', type: 'form', id: 'basic_options',                     
                items: [
                  {type: 'listbox', name: 'category_nested_listbox', id: 'category_nested_listbox', label: 'Advancement level of the list:',
                  values : [
                    {text: 'only categories', value: 'nested0', tooltip: 'Inserts only categories, without subcategories.' },
                    {text: 'categories and subcategories', value: 'nested1', tooltip: 'Inserts categories and their all subcategories.' },
                    {text: 'all', value: 'nested2', tooltip: 'Insert categories, their all subcategories and titles of all posts.' },
                  ],
                  value : itj_isac.get_default_value_for_field('category_nested_listbox'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  },
                  
                  {type: 'listbox', name: 'all_or_current_listbox', id: 'all_or_current_listbox',
                  label: 'Which categories to display?', 
                  values: [
                    {text: 'all', value: 'all', tooltip: 'Inserts all categories.' },
                    {text: 'based on the current one', value: 'current', tooltip: 'It will insert only categories based on the current category, which means its subcategories.'}
                  ],
                  value: itj_isac.get_default_value_for_field('all_or_current_listbox'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  },
                  
                  {type: 'button', name: 'category_as_link_radio', classes: 'radio-button itj_button_on', id: 'category_as_link_radio',
                  label: 'Should the category be a link?',                     
                  text: itj_isac.get_default_value_for_field('category_as_link_radio'),
                  value: itj_isac.get_default_value_for_field('category_as_link_radio'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },
                  
                  {type: 'button', name: 'category_description_radio', classes: 'radio-button itj_button_off',  id: 'category_description_radio',
                  label: 'Should it add categories descriptions?',                     
                  text: itj_isac.get_default_value_for_field('category_description_radio'),
                  value:  itj_isac.get_default_value_for_field('category_description_radio'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },
                  
                  {type: 'button', name: 'category_count_radio', classes: 'radio-button itj_button_off', id: 'category_count_radio',
                  label: 'Should it display the number of posts?',                     
                  tooltip: 'Liczba postów będzie wyświetlona w nawiasie za nazwą kategorii.',
                  text: itj_isac.get_default_value_for_field('category_count_radio'),
                  value: itj_isac.get_default_value_for_field('category_count_radio'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },
                  
                  {type: 'button', name: 'post_display_radio', classes: 'radio-button itj_button_on', id: 'post_display_radio',
                    label: 'Should it display posts?',
                    text: itj_isac.get_default_value_for_field('post_display_radio'),
                    value: itj_isac.get_default_value_for_field('post_display_radio'),
                    onClick: function(){
                      itj_isac.toggle_button(this);
                      }
                    },
                  
                  {type: 'button', name: 'post_as_link_radio', classes: 'radio-button nested2_switch itj_button_on', id: 'post_as_link_radio',
                  label: 'Should the post be a link?',
                  text: itj_isac.get_default_value_for_field('post_as_link_radio'),
                  value: itj_isac.get_default_value_for_field('post_as_link_radio'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },
                  
                  {type: 'button', name: 'post_digest_radio', classes: 'radio-button nested2_switch itj_button_off',  id: 'post_digest_radio',
                  label: 'Should it add post digest?',
                  tooltip: 'Post digest is a shortened post content, usually encourage to read it entirely.',                     
                  text: itj_isac.get_default_value_for_field('post_digest_radio'),
                  value: itj_isac.get_default_value_for_field('post_digest_radio'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },                   
                  
                  {type: 'listbox', name: 'category_markup_listbox', id: 'category_markup_listbox',
                  label: 'Basic layout of the category:',
                  tooltip: 'Default: mixed list',
                  values : [
                    {text: 'ordered list', value: 'ordered_list', tooltip: 'It will start with consecutive numbers - it corresponds to the <ol> tag. Default: mixed list.' },
                    {text: 'unorderes list', value: 'unordered_list', tooltip: 'It will be prefixed by a symbol, by default a dot - it corresponds to the <ul> tag. Default: a mixed list.' },
                    {text: 'mixed list', value: 'mixed_list', tooltip: 'Categories and subcategories will be prefixed by <ol> and posts by <ul>. Default: a mixed list.' },
                    {text: 'raw text', value: 'raw_text', tooltip: 'Categories, subcategories and posts will be separated by the <br> tag. Default: a mixed list.'},
                  ],
                  value : itj_isac.get_default_value_for_field('category_markup_listbox'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  }
                  
                ]
                //end of basic_options
                },
                
                {title: 'Advanced options', type: 'form', id: 'advanced_options',                     
                items: [
                  {type: 'container', classes:'container-text', html: '<div><p>The following options are intended for advanced users - require some knowledge and/or reading the appropriate documentation and/or testing. Each option contains a tip about the default value.</p></div>'},
                  
                  {type: 'listbox', name: 'category_name_listbox', id: 'category_name_listbox',
                  label: 'How to display the category name?',
                  values : [
                    {text: 'only name', value: 'only_name',  },
                    {text: 'Category: name', value: 'category_and_name', tooltip: 'The category names will be prefixed with text: "Category: " (including the space). Default: only name.' },
                    {text: 'Your template name', value: 'template_name', tooltip: 'Plan prefixed text yourself. The size of letters and the presence of spaces is important. Default: only name.' },
                  ],
                  value : itj_isac.get_default_value_for_field('category_name_listbox'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  },
                  
                  {type: 'textbox', name: 'template_name_text', classes: 'template_name_switch', id: 'template_name_text',
                  label: 'Your template for category:',
                  value: itj_isac.get_default_value_for_field('template_name_text'),
                  disabled: true,
                  tooltip: 'Plan prefixed text yourself. The size of letters and the presence of spaces is important. Default: only name. Default: template is not used.'
                  },
                  
                  {type: 'textbox', name: 'no_post_text', classes: 'nested2_switch', id: 'no_post_text',
                  label: 'Information about no posts:',
                  value: itj_isac.get_default_value_for_field('no_post_text'),
                  tooltip: 'Text about no posts is displayed when the category or subcategory has no posts. If you leave it blank, the text will not be displayed. Default: There are no posts in the category.'
                  },
                  
                  {type: 'textbox', name: 'post_digest_length', classes: 'nested2_switch', id: 'post_digest_length',
                  label: 'Post digest length:',
                  value: itj_isac.get_default_value_for_field('post_digest_length'),
                  tooltip: 'The length of post digets indicates the number of characters the post will be shortened. If previously was selected the option for not displaying digest - the content of this field will be ignored. If in the given length (in fact scope) is the sign "Read more" - digest will be automatically shortened to this sign. Default: 100. '
                  },
                  
                  {type: 'container', classes:'container-text', html: '<div><p>The following options must be given as in WordPress documentation. They refer to get_categories function parameters - which are identical to the parameters <a target="_blank" href="https://developer.wordpress.org/reference/classes/wp_term_query/__construct/">WP_Term_Query::__construct</a>. By default, each parameter can be skipped. All parameter conflicts are dealt with exactly the same way as the documentation says.</p></div>'},
                  
                  {type: 'textbox', name: 'orderby', id: 'orderby',
                  label: 'Categories sort parameter:',
                  value: itj_isac.get_default_value_for_field('orderby'),
                  tooltip: 'Categories sort parameter (orderby): the most commonly used are name (default, sorting by name), term_id (by identification numbers) and slug (short name).'
                  },
                  
                  {type: 'listbox', name: 'order', id: 'order',
                  label: 'What order to sort in?',
                  tooltip: 'Sort order parameter (order): by default, ascending (ASC).',
                  values : [
                    {text: 'ascending', value: 'ascending' },
                    {text: 'descending', value: 'descending' },
                  ],
                  value : itj_isac.get_default_value_for_field('order'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  },
                  
                  {type: 'textbox', name: 'include', id: 'include',
                  label: 'Include (ID):',
                  value: itj_isac.get_default_value_for_field('include'),
                  tooltip: 'Parameter for including categories/subcategories (include): takes term_ID values - separated by commas. Default: empty.',
                  },
                  
                  {type: 'textbox', name: 'exclude', classes: 'excluder_switch', id: 'exclude',
                  label: 'Exclude (ID):',
                  value: itj_isac.get_default_value_for_field('exclude'),
                  tooltip: 'Parameter for excluding categories/subcategories (exclude): takes term_ID values - separated by commas. Default: empty. If the previous option is not empty, it will be ignored!'
                  },
                  
                  {type: 'textbox', name: 'exclude_tree',  classes: 'excluder_switch',  id: 'exclude_tree',
                  label: 'Exclude with descendants (ID):',
                  value: itj_isac.get_default_value_for_field('exclude_tree'),
                  tooltip: 'Parameter for excluding categories/subcategories with descendants (exclude_tree): takes term_ID values - separated by commas. Default: empty. If the option to include is not empty, it will be ignored!'
                  },
                  
                  {type: 'textbox', name: 'itj_slug', id: 'itj_slug',
                  label: 'Shorten name:',
                  value: itj_isac.get_default_value_for_field('itj_slug'),
                  tooltip: 'Parameter of shorten name of category/subcategory (slug): default empty.'
                  },
                  
                  {type: 'textbox', name: 'child_of', id: 'child_of',
                  label: 'Child of (ID):',
                  value: itj_isac.get_default_value_for_field('child_of'),
                  tooltip: 'Parameter of taking childs of (child_of): takes the ID values to get his descendants. Default: empty.'
                  },
                  
                  {type: 'textbox', name: 'itj_parent',  id: 'itj_parent',
                  label: 'Parent (ID):',
                  value: itj_isac.get_default_value_for_field('itj_parent'),
                  tooltip: 'Parameter of taking direct descendants (parent): accepts ID values to obtain direct descendants. Default: empty.'
                  },
                  
                ]
                //end of advanced_options
                },
                
                {title: 'More advanced options', type: 'form', id: 'more_advanced_options',                     
                items: [
                  {type: 'container', classes:'container-text', html: '<div><p>The following options are intended for advanced users - require some knowledge and/or reading the appropriate documentation and/or testing.</p><p>Not all default values are included.</p></div>'},
                  
                  {type: 'textbox', name: 'pre_whole_text', id: 'pre_whole_text',
                  label: 'Text before whole:',
                  value: itj_isac.get_default_value_for_field('pre_whole_text'),
                  tooltip: 'If you choose to display all categories and subcategories, you may want to start it with the following text: Page map:.'
                  },
                  
                  {type: 'textbox', name: 'after_whole_text', id: 'after_whole_text',
                    label: 'Text after whole:',
                    value: itj_isac.get_default_value_for_field('after_whole_text'),
                    },
                  
                  {type: 'textbox', name: 'pre_posts_text', classes: 'nested2_switch', id: 'pre_posts_text',
                  label: 'Text before poste:',
                  value: itj_isac.get_default_value_for_field('pre_posts_text'),
                  tooltip: 'For example: List of posts :.'
                  },
                  
                  {type: 'listbox', name: 'wrap_post_listbox', classes: 'nested2_switch', id: 'wrap_post_listbox',
                  label: 'How to present posts?',
                  values : [
                    {text: 'ordered list', value: 'ordered_list', tooltip: 'Each post will be prefixed by the consecutive number - it corresponds to the <ol> tag. Default: unordered list.' },
                    {text: 'unordered list', value: 'unordered_list', tooltip: 'Each post will be prefixed by a symbol, by default a dot - it corresponds to the <ul> tag. Default: unordered list.' },
                    {text: 'every post from the new line', value: 'new_line_list', tooltip: 'Each post will be prefixed by a new line - it corresponds to the <br/> tag. Default: unordered list.' },
                    {text: 'every post from a new paragraph', value: 'new_paragraph_list', tooltip: 'Each post will be a different paragraph - it corresponds to the <p> tag. Default: unordered list.' },
                  ],
                  value : itj_isac.get_default_value_for_field('wrap_post_listbox'),
                  onClick: function(){
                    itj_isac.position_listbox(this);
                    }
                  },
                  
                  {type: 'container', classes:'container-text', html: '<div><p>The following options must be given as in WordPress documentation. They refer to get_categories function parameters - which are identical to the parameters <a target="_blank" href="https://developer.wordpress.org/reference/classes/wp_term_query/__construct/">WP_Term_Query::__construct</a>. By default, each parameter can be skipped. All parameter conflicts are dealt with exactly the same way as the documentation says.</p></div>'},
                  
                  {type: 'textbox', name: 'number', id: 'number',
                  label: 'Number of category nesting:',
                  value: itj_isac.get_default_value_for_field('number'),
                  tooltip: 'Number of category nesting (number): maximum number of nesting levels, default 0, which means all. ATTENTION! It has priority over the advancement level of the list.'
                  },
                  
                  {type: 'textbox', name: 'itj_name', id: 'itj_name',
                  label: 'Category name:',
                  value: itj_isac.get_default_value_for_field('itj_name'),
                  tooltip: 'The name of the category (name) to take in: empty by default.'
                  },
                  
                  {type: 'button', name: 'childless', classes: 'radio-button itj_button_off', id: 'childless',
                  label: 'Limit to childless?',                               
                  tooltip:'Limit to categories that do not have posts (childless). Default: no.',
                  text: itj_isac.get_default_value_for_field('childless'),
                  value: itj_isac.get_default_value_for_field('childless'),
                  onClick: function(){
                    itj_isac.toggle_button(this);
                    }
                  },
                  
                  {type: 'container', classes:'container-text', html: '<div><p>Appearance design: The following options require knowledge of Cascading Style Sheets (CSS)</p></div>'},
                  
                  {type: 'textbox', name: 'categories_class', id: 'categories_class',
                  label: 'Categories class:',
                  value: itj_isac.get_default_value_for_field('categories_class'),
                  tooltip: 'For each category will be added a CSS class/es. If you want to add several, separate them with spaces. For example: my_class categories.'
                  },
                  
                  {type: 'textbox', name: 'posts_class', id: 'posts_class',
                  label: 'Posts class:',
                  value: itj_isac.get_default_value_for_field('posts_class'),
                  tooltip: 'For each post will be added a CSS class/es. If you want to add several, separate them with spaces. For example: my_classes posts category-posts.'
                  },
                  
                  {type: 'textbox', name: 'digests_class', id: 'digests_class',
                  label: 'Digests class:',
                  value: itj_isac.get_default_value_for_field('digests_class'),
                  tooltip: 'For each digest will be added a CSS class/es. If you want to add several, separate them with spaces. For example: digest post.'
                  },
                  
                ]
                // end of more_advanced_options
                },
                
                {title: 'PRO - Programmers options', type: 'form', id: 'programmer_options',
                items: [
                  {type: 'container', name:"pro-control", classes:'container-text', html: '<div><p>Options for the most advanced users. Some of them are already planned, but not yet written.</p></div>'},
                  {type: 'checkbox', name: 'ignore_all', id: 'ignore_all',
                    label: 'Ignore all previous settings',
                  },
                  {type: 'container', name:"pro-control3", classes:'container-text',
                  html: '<div><p>If the following option is selected, after clicking OK, the plugin will print all marked options along with the values in the post edit window. Otherwise, only those that have values other than the default ones will be listed.</p></div>'
                  },
                  {type: 'checkbox', name: 'return_all', id: 'return_all',
                  label: 'Return all options with arguments',
                  }
                ]
                //end of programmer_options
                }
                
              ] 
              }
              //end of plugin body
            ],
            // SETTING FUNCTIONS FOR TinyMCE HANDLERS        
            /* onClick, onKeyup, onPaste - apply disabling rules */
            /* onClick - when click or choose with keyboard (when you write something in textbox you click or choose firstly),
             * onKeyUp - when write down with keyboard and when you remove sth from textbox (writing down is checked onClick, but if there isn't onKeyUp
             *  - after remove you must click to recheck), *  onPaste - when you paste of course*/
            
            onClick: function(e) {
              itj_isac.apply_disabling_rules(itj_isac.control_disabling_settings, itj_isac.commonSelectorMakerFN);
            },
            onKeyUp: function(e) {
              itj_isac.apply_disabling_rules(itj_isac.control_disabling_settings, itj_isac.commonSelectorMakerFN);
            },
            onPaste: function(e) {
              itj_isac.apply_disabling_rules(itj_isac.control_disabling_settings, itj_isac.commonSelectorMakerFN);
            },
            
            //onSubmit - return options with settings to post content
            onSubmit: function(e) {
              var data = itj_isac.getEnabledOptions(e.data, itj_isac.commonSelectorMakerFN)
              editor.selection.setContent('[insert_sub_and_category' + ((data.length > 0) ? (' ' + data) : '') + "]");
             },
            
            // Unbind resizeHandler - don't call this function after closing modalWindow
            onClose: function(e) {
              jQuery(window).off('resize', itj_isac.resizeHandler);
              jQuery('#insert_sub_and_category').off('click', itj_isac.resizeModal);
              itj_isac.dialogEventDispatcher.off('repaint', itj_isac.resizeHandler);
            }
          });
          
          //Bind resizeHandler on resize window
          jQuery(window).on('resize', itj_isac.resizeHandler);
          jQuery('#insert_sub_and_category').on('click', itj_isac.resizeModal);

          //"If it looks stupid but works it ain't stupid."
          // This is not beautifull solution and base on javascript objects.
          // If you've got better idea - don't hesitate to send message for me.
          itj_isac.dialogEventDispatcher = editor.windowManager.getWindows()[0]._eventDispatcher;
          itj_isac.dialogEventDispatcher.on('repaint', itj_isac.resizeHandler);
          
          // This is not beautifull eaither and base on applying after all scripts (with timeout), but works.
          // If you've got better idea - don't hesitate to send message for me.
          jQuery('#insert_sub_and_category').ready(itj_isac.timeoutResizeHandler);
                 
          //Resizing after tab with options was clicked - after all scripts
          jQuery('div[id^="available_options-t"]').on('click', itj_isac.timeoutResizeHandler);
          
          //Offset is set initial in resizeHandler for modalWindow - overwrites TinyMCE scripts. This adds css class,
          // that access user to move that window (after first click).
          jQuery('#insert_sub_and_category-dragh').one('mousedown', itj_isac.activateMove);
          
        }
      //end of plugin button
      });
    //end of init
    }
  });
  //end of register
  
  //--- ADD PLUGIN SCRIPT --- //
  /* Start the buttons */
  tinymce.PluginManager.add('itj_isac_add_tinymce_button_script', tinymce.plugins.MyButtons);
}//end of itj object
)();

//=============== THANKS & DEDICATIONS =============== //
//--- you really DON'T HAVE TO read anything below this, but out of curiosity you can --- //
/* *
 * I would like to thank my beloved one - for supporting me emotionaly, physicaly, theoreticaly and practicaly (and meterialy, BTW) - in writing this plugin. *
 * Without you, I wil not be able to do this - literally. You give me smile, when I firstly cry over TinyMCE documentation (etc.), you give me strength*
 * to not throwing down to trash this code (and provoke - "If you think you can't finish it up..."). You explain me and interested in 'programming stuff'.*
 * You give me your expert advices, help me with javascript functions and other magic arcanes in this project.*
 * And last but not least - you bring me food sometimes :-). So, really, thanks:*
 * P.S. Thanks for advice about doing modal window only in base of TinyMCE environment not my own HTML for don't have problems with getting options settings.*
 * So, I don't have problems with THAT. *
 * *
 * I would like to thank also TinyMCE developers & code writers for doing this platform. For old (TinyMCE 3.x) and new(TinyMCE 4.x) documentation. It gives me some help.*
 * Many thanks for WorPress developers - so I could work on this platform. It seems to be flexible and pleasant to work with.*
 * I would also like to thank writers from developer.wordpress.org for documentation about WordPress - especially about plugins, shortcodes, funtion get_categories()*
 * and get_terms() and constructor WP_Term_Query::__construct. Without this, I will be working at this code over years. *
 * *
 * I think I can thanks users from stackoverflow.com (especially mention by names: Olav, Mujnoi Gyula Tamas, Gagaro and other coders). Their answers or questions*
 * was helpfull with work on this code.*
 * *
 * * Some thanks goes for my family - my loved mom & dad, my sister and her husband (and theirs little family too) and my grandma. You give me rest, peace and time *
 * to finish it - thank you, if you ever believe in me. *
 * (Piszę także pewne podziękowania dla mojej rodziny - kochanej mamy i kochanego taty, mojej siostry i jej męża (a także ich małej rodziny) i mojej babci. Daliście *
 * mi odpoczynek, spokój i czas na dokończenie tego kodu - dziękuję Wam za wiarę we mnie.)
 * * 
 * At the and, I beg forgiveness of all those who have been with me over this time and whose names or position I have failed to mention. Have my smile.*
 * *
 * */


