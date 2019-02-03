/***************************************************************************************************
PopupWindow2 - The ultimate popup/dialog/modal jQuery plugin
    Author          : Gaspare Sganga
    Version         : 1.0.3
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-popup-window/
***************************************************************************************************/
(function($, undefined){
    // Default Settings
    var _defaults = {
        title               : "Popup Window",
        modal               : true,
        autoOpen            : true,
        animationTime       : 300,
        customClass         : "",
        
        buttons             : {
            close               : true,
            maximize            : true,
            collapse            : true,
            minimize            : true
        },
        buttonsPosition     : "right",
        buttonsTexts        : {
            close               : "Close",
            maximize            : "Maximize",
            unmaximize          : "Restore",
            minimize            : "Minimize",
            unminimize          : "Show",
            collapse            : "Collapse",
            uncollapse          : "Expand"
        }, 
        
        draggable           : true,
        dragOpacity         : 0.6,
        
        resizable           : true,
        resizeOpacity       : 0.6,
        
        statusBar           : true,
        
        top                 : "auto",
        left                : "auto",
        
        height              : 200,
        width               : 400,
        maxHeight           : undefined,
        maxWidth            : undefined,
        minHeight           : 100,
        minWidth            : 200,
        collapsedWidth      : undefined,
        
        keepInViewport      : true,
        mouseMoveEvents     : true
    };
    
    // Required CSS
    var _css = {
        container : {
            "box-sizing"        : "border-box",
            "position"          : "fixed",
            "top"               : "0",
            "bottom"            : "0",
            "right"             : "0",
            "left"              : "0",
            "display"           : "flex",
            "justify-content"   : "flex-start",
            "align-content"     : "flex-start",
            "pointer-events"    : "none"
        },
        overlay : {
            "box-sizing"        : "border-box",
            "position"          : "fixed",
            "top"               : "0",
            "left"              : "0",
            "width"             : "100%",
            "height"            : "100%"
        },
        minplaceholder : {
            "box-sizing"        : "border-box",
            "background"        : "transparent",
            "border"            : "none"
        },
        PopupWindow2 : {
            "box-sizing"        : "border-box",
            "display"           : "flex",
            "flex-flow"         : "column nowrap",
            "position"          : "absolute",
            "padding"           : "0",
            "pointer-events"    : "auto"
        },
        titlebar : {
            "box-sizing"        : "border-box",
            "flex"              : "0 0 auto",
            "display"           : "flex",
            "align-items"       : "center"
        },
        titlebar_text : {
            "box-sizing"        : "border-box",
            "flex"              : "1 1 auto",
            "overflow"          : "hidden",
            "text-overflow"     : "ellipsis",
            "white-space"       : "nowrap"
        },
        titlebar_button : {
            "box-sizing"        : "border-box",
            "flex"              : "0 0 auto",
            "display"           : "flex"
        },
        content : {
            "flex"              : "1 1 auto",
            "overflow"          : "auto"
        },
        statusbar : {
            "box-sizing"        : "border-box",
            "flex"              : "0 0 auto",
            "display"           : "flex",
            "align-items"       : "flex-end"
        },
        statusbar_content : {
            "box-sizing"        : "border-box",
            "flex"              : "1 1 auto",
            "overflow"          : "hidden",
            "text-align"        : "left",
            "text-overflow"     : "ellipsis",
            "white-space"       : "nowrap"
        },
        statusbar_handle : {
            "box-sizing"        : "border-box",
            "display"           : "flex"
        },
        statusbar_handle_resizable : {
            "cursor"            : "se-resize"
        },
        resizer_top : {
            "position"          : "absolute",
            "left"              : "0",
            "right"             : "0",
            "cursor"            : "n-resize"
        },
        resizer_bottom : {
            "position"          : "absolute",
            "left"              : "0",
            "right"             : "0",
            "cursor"            : "s-resize"
        },
        resizer_left : {
            "position"          : "absolute",
            "top"               : "0",
            "bottom"            : "0",
            "cursor"            : "e-resize"
        },
        resizer_right : {
            "position"          : "absolute",
            "top"               : "0",
            "bottom"            : "0",
            "cursor"            : "w-resize"
        },
        resizer_topleft : {
            "position"          : "absolute",
            "cursor"            : "nw-resize"
        },
        resizer_topright : {
            "position"          : "absolute",
            "cursor"            : "ne-resize"
        },
        resizer_bottomleft : {
            "position"          : "absolute",
            "cursor"            : "ne-resize"
        },
        resizer_bottomright : {
            "position"          : "absolute",
            "cursor"            : "nw-resize"
        }
    };
    
    // Icons
    var _icons = {
        close           : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y2="0" x2="10" y1="10" x1="0"/><line y2="10" x2="10" y1="0" x1="0"/></g></svg>',
        collapse        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><polyline points="1,7 9,7 5,2 1,7 9,7"/></g></svg>',
        uncollapse      : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><polyline points="1,3 9,3 5,8 1,3 9,3"/></g></svg>',
        maximize        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><rect x="1" y="1" height="8" width="8"/></g></svg>',
        unmaximize      : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g fill="none"><rect x="1" y="3" height="6" width="6"/><line y1="3" x1="3" y2="1" x2="3"/><line y1="1" x1="2.5" y2="1" x2="9.5"/><line y1="1" x1="9" y2="7" x2="9"/><line y1="7" x1="9.5" y2="7" x2="7"/></g></svg>',
        minimize        : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y1="6" x1="8" y2="6" x2="2"/></g></svg>',
        resizeHandle    : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10 10" height="100%" width="100%"><g><line y2="0" x2="10" y1="10" x1="0"/><line y2="2" x2="12" y1="12" x1="2"/><line y2="4" x2="14" y1="14" x1="4"/></g></svg>'
    };
    
    // Constants
    var _constants = {
        resizersWidth                   : 4,
        secondaryAnimationTimeFactor    : 3
    };
    
    // Main Container
    var _mainContainer;
    
    // Minimized Area
    var _minimizedArea = {
        position    : "bottom left",
        direction   : "horizontal"
    };
    
    
    // **************************************************
    //  METHODS
    // **************************************************
    $.PopupWindow2Setup = function(options){
        $.extend(true, _defaults, options);
    };
    
    $.PopupWindow2MinimizedArea = function(options){
        if (options === undefined) return $.extend({}, _minimizedArea);
        if (options.position) _minimizedArea.position = ((options.position.toLowerCase().indexOf("b") >= 0) ? "bottom" : "top") + " " + ((options.position.toLowerCase().indexOf("l") >= 0) ? "left" : "right");
        if (options.direction) _minimizedArea.direction = (options.direction.toLowerCase().indexOf("h") >= 0) ? "horizontal" : "vertical";
        _SetMinimizedArea();
    };

    $.fn.PopupWindow2 = function(opt1, opt2){
        if (typeof opt1 == "string") {
            switch (opt1.toLowerCase()) {
                case "init":
                    return this.each(function(){
                        _Init($(this), opt2);
                    });
                case "open":
                    return this.each(function(){
                        _Open($(this).closest(".PopupWindow2"));
                    });
                case "close":
                    return this.each(function(){
                        _Close($(this).closest(".PopupWindow2"));
                    });
                case "maximize":
                    return this.each(function(){
                        _Maximize($(this).closest(".PopupWindow2"));
                    });
                case "unmaximize":
                    return this.each(function(){
                        _Unmaximize($(this).closest(".PopupWindow2"));
                    });
                case "collapse":
                    return this.each(function(){
                        _Collapse($(this).closest(".PopupWindow2"));
                    });
                case "uncollapse":
                    return this.each(function(){
                        _Uncollapse($(this).closest(".PopupWindow2"));
                    });
                case "minimize":
                    return this.each(function(){
                        _Minimize($(this).closest(".PopupWindow2"));
                    });
                case "unminimize":
                    return this.each(function(){
                        _Unminimize($(this).closest(".PopupWindow2"));
                    });
                case "getposition":
                    if (!this[0]) return undefined;
                    return _GetCurrentPosition($(this[0]).closest(".PopupWindow2"));
                case "setposition":
                   return this.each(function(){
                        _ChangePosition($(this).closest(".PopupWindow2"), $.extend({}, opt2, {
                            check   : true,
                            event   : true
                        }), true);
                    });
                case "getsize":
                    if (!this[0]) return undefined;
                    return _GetCurrentSize($(this[0]).closest(".PopupWindow2"));
                case "setsize":
                    return this.each(function(){
                        _ChangeSize($(this).closest(".PopupWindow2"), $.extend({}, opt2, {
                            checkSize       : true,
                            checkPosition   : true,
                            event           : true
                        }), true);
                    });
                case "getstate":
                    if (!this[0]) return undefined;
                    return _GetState($(this[0]).closest(".PopupWindow2"));
                case "setstate":
                    return this.each(function(){
                        _SetState($(this).closest(".PopupWindow2"), opt2);
                    });
                case "settitle":
                    return this.each(function(){
                        _SetTitle($(this).closest(".PopupWindow2"), opt2);
                    });
                case "statusbar":
                    return this.each(function(){
                        _StatusBar($(this).closest(".PopupWindow2"), opt2);
                    });
                case "destroy":
                    return this.each(function(){
                        _Destroy($(this).closest(".PopupWindow2"));
                    }); 
            }
        } else {
            return this.each(function(){
                _Init($(this), opt1);
            });
        }
    };
    
    
    // **************************************************
    //  FUNCTIONS
    // **************************************************
    function _Init(originalTarget, options){
        if (originalTarget.closest(".PopupWindow2").length) {
            _Warning("jQuery PopupWindow2 is already initialized on this element");
            return;
        }
        var settings = $.extend(true, {}, _defaults, options);
        settings.animationTime  = parseInt(settings.animationTime, 10);
        settings.height         = parseInt(settings.height, 10);
        settings.width          = parseInt(settings.width, 10);
        settings.maxHeight      = parseInt(settings.maxHeight, 10) || 0;
        settings.maxWidth       = parseInt(settings.maxWidth, 10) || 0;
        settings.minHeight      = parseInt(settings.minHeight, 10) || 0;
        settings.minWidth       = parseInt(settings.minWidth, 10) || 0;
        
        // Overlay
        var overlay = $("<div>", {
            class   : "PopupWindow2_overlay"
        })
        .css(_css.overlay)
        .appendTo(_mainContainer);
        if (settings.modal) overlay.css("pointer-events", "auto");
        
        // Minimized Placeholder
        var minPlaceholder = $("<div>", {
            class   : "PopupWindow2_minplaceholder"
        })
        .css(_css.minplaceholder)
        .hide()
        .appendTo(_mainContainer);
        
        // Popup Window
        var position    = {
            left    : (settings.left == "auto") ? ((overlay.width() - settings.width) / 2) : parseInt(settings.left, 10),
            top     : (settings.top == "auto") ? ((overlay.height() - settings.height) / 2) : parseInt(settings.top, 10)
        };
        var PopupWindow2 = $("<div>", {
            class   : "PopupWindow2",
            css     : {
                height  : settings.height,
                left    : position.left,
                top     : position.top,
                width   : settings.width
            }
        })
        .css(_css.PopupWindow2)
        .addClass(settings.customClass)
        .data({
            originalTarget      : originalTarget,
            originalParent      : originalTarget.parent(),
            overlay             : overlay,
            minPlaceholder      : minPlaceholder,
            settings            : settings,
            opened              : false,
            collapsed           : false,
            minimized           : false,
            maximized           : false,
            currentPosition     : position,
            currentSize         : {
                height  : settings.height,
                width   : settings.width
            },
            savedPosition       : undefined,
            savedSize           : undefined
        })
        .on("mousedown", ".PopupWindow2_titlebar_draggable", _Titlebar_MouseDown)
        .appendTo(overlay);
        
        // Titlebar
        var leftToRight = (settings.buttonsPosition.toLowerCase().indexOf("l") < 0);
        var titlebar = $("<div>", {
            class   : "PopupWindow2_titlebar"
        })
        .css(_css.titlebar)
        .appendTo(PopupWindow2);
        if (settings.draggable) titlebar.addClass("PopupWindow2_titlebar_draggable");
        
        // Text
        $("<div>", {
            class   : "PopupWindow2_titlebar_text",
            text    : settings.title
        })
        .css(_css.titlebar_text)
        .css("order", leftToRight ? 1 : 5)
        .appendTo(titlebar);
        
        // Buttons
        if (settings.buttons.close) {
            $("<div>", {
                class   : "PopupWindow2_titlebar_button PopupWindow2_titlebar_button_close"
            })
            .css(_css.titlebar_button)
            .css("order", leftToRight ? 5 : 1)
            .attr("title", settings.buttonsTexts.close)
            .on("click", _ButtonClose_Click)
            .append(_icons.close)
            .appendTo(titlebar);
        }
        if (settings.buttons.maximize) {
            $("<div>", {
                class   : "PopupWindow2_titlebar_button PopupWindow2_titlebar_button_maximize"
            })
            .css(_css.titlebar_button)
            .css("order", leftToRight ? 4 : 2)
            .attr("title", settings.buttonsTexts.maximize)
            .on("click", _ButtonMax_Click)
            .append(_icons.maximize)
            .appendTo(titlebar);
        }
        if (settings.buttons.collapse) {
            $("<div>", {
                class   : "PopupWindow2_titlebar_button PopupWindow2_titlebar_button_collapse"
            })
            .css(_css.titlebar_button)
            .css("order", leftToRight ? 3 : 3)
            .attr("title", settings.buttonsTexts.collapse)
            .on("click", _ButtonCollapse_Click)
            .append(_icons.collapse)
            .appendTo(titlebar);
        }
        if (settings.buttons.minimize) {
            $("<div>", {
                class   : "PopupWindow2_titlebar_button PopupWindow2_titlebar_button_minimize"
            })
            .css(_css.titlebar_button)
            .css("order", leftToRight ? 2 : 4)
            .attr("title", settings.buttonsTexts.minimize)
            .on("click", _ButtonMin_Click)
            .append(_icons.minimize)
            .appendTo(titlebar);
        }
        
        // Content
        var content = $("<div>", {
            class   : "PopupWindow2_content"
        })
        .css(_css.content)
        .appendTo(PopupWindow2);
        originalTarget.show().appendTo(content);
        
        // StatusBar
        if (settings.statusBar) {
            var statusBar = $("<div>", {
                class   : "PopupWindow2_statusbar"
            })
            .css(_css.statusbar)
            .appendTo(PopupWindow2);
            
            $("<div>", {
                class   : "PopupWindow2_statusbar_content"
            })
            .css(_css.statusbar_content)
            .appendTo(statusBar);
            
            var resizeHandle = $("<div>", {
                class   : "PopupWindow2_statusbar_handle"
            })
            .css(_css.statusbar_handle)
            .appendTo(statusBar);
            if (settings.resizable) {
                resizeHandle
                    .css(_css.statusbar_handle_resizable)
                    .append(_icons.resizeHandle)
                    .on("mousedown", null, {
                        dimension   : "both",
                        directionX  : "right",
                        directionY  : "bottom"
                    }, _Resizer_MouseDown);
            }
        }
        
        // Resizing
        if (settings.resizable) {
            var bordersWidth = _GetBordersWidth(PopupWindow2);
            // Top
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_top",
                css     : {
                    top     : 0 - bordersWidth.top - (_constants.resizersWidth / 2),
                    height  : bordersWidth.top + _constants.resizersWidth
                }
            })
            .css(_css.resizer_top)
            .on("mousedown", null, {
                dimension   : "height",
                directionY  : "top"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Bottom
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_bottom",
                css     : {
                    bottom  : 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
                    height  : bordersWidth.bottom + _constants.resizersWidth
                }
            })
            .css(_css.resizer_bottom)
            .on("mousedown", null, {
                dimension   : "height",
                directionY  : "bottom",
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Left
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_left",
                css     : {
                    left    : 0 - bordersWidth.left - (_constants.resizersWidth / 2),
                    width   : bordersWidth.left + _constants.resizersWidth
                }
            })
            .css(_css.resizer_left)
            .on("mousedown", null, {
                dimension   : "width",
                directionX  : "left"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Right
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_right",
                css     : {
                    right   : 0 - bordersWidth.right - (_constants.resizersWidth / 2),
                    width   : bordersWidth.right + _constants.resizersWidth
                }
            })
            .css(_css.resizer_right)
            .on("mousedown", null, {
                dimension   : "width",
                directionX  : "right",
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Top Left
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_topleft",
                css     : {
                    top     : 0 - bordersWidth.top - (_constants.resizersWidth / 2),
                    left    : 0 - bordersWidth.left - (_constants.resizersWidth / 2),
                    width   : bordersWidth.left + _constants.resizersWidth,
                    height  : bordersWidth.top + _constants.resizersWidth
                }
            })
            .css(_css.resizer_topleft)
            .on("mousedown", null, {
                dimension   : "both",
                directionX  : "left",
                directionY  : "top"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Top Right
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_topright",
                css     : {
                    top     : 0 - bordersWidth.top - (_constants.resizersWidth / 2),
                    right   : 0 - bordersWidth.right - (_constants.resizersWidth / 2),
                    width   : bordersWidth.right + _constants.resizersWidth,
                    height  : bordersWidth.top + _constants.resizersWidth
                }
            })
            .css(_css.resizer_topright)
            .on("mousedown", null, {
                dimension   : "both",
                directionX  : "right",
                directionY  : "top"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Bottom Left
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_bottomleft",
                css     : {
                    bottom  : 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
                    left    : 0 - bordersWidth.left - (_constants.resizersWidth / 2),
                    width   : bordersWidth.left + _constants.resizersWidth,
                    height  : bordersWidth.bottom + _constants.resizersWidth
                }
            })
            .css(_css.resizer_bottomleft)
            .on("mousedown", null, {
                dimension   : "both",
                directionX  : "left",
                directionY  : "bottom"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
            // Bottom Right
            $("<div>", {
                class   : "PopupWindow2_resizer PopupWindow2_resizer_bottomright",
                css     : {
                    bottom  : 0 - bordersWidth.bottom - (_constants.resizersWidth / 2),
                    right   : 0 - bordersWidth.right - (_constants.resizersWidth / 2),
                    width   : bordersWidth.right + _constants.resizersWidth,
                    height  : bordersWidth.bottom + _constants.resizersWidth
                }
            })
            .css(_css.resizer_bottomright)
            .on("mousedown", null, {
                dimension   : "both",
                directionX  : "right",
                directionY  : "bottom"
            }, _Resizer_MouseDown)
            .appendTo(PopupWindow2);
        }
        
        // Final Settings
        if (!settings.modal) overlay.width(0).height(0);
        overlay.hide();
        if (settings.autoOpen) _Open(PopupWindow2);
    }
    
    function _Open(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || PopupWindow2.data("opened")) return;
        PopupWindow2.data("overlay").show();
        PopupWindow2.data("opened", true);
        _TriggerEvent(PopupWindow2, "open");
        _Uncollapse(PopupWindow2);
        _Unminimize(PopupWindow2)
    }
    function _Close(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened")) return;
        if (PopupWindow2.data("minimized")) _Unminimize(PopupWindow2);
        PopupWindow2.data("overlay").hide();
        PopupWindow2.data("opened", false);
        _TriggerEvent(PopupWindow2, "close");
    }
    
    function _Maximize(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || PopupWindow2.data("maximized") || PopupWindow2.data("collapsed") || PopupWindow2.data("minimized")) return;
        var settings = PopupWindow2.data("settings");
        
        PopupWindow2.find(".PopupWindow2_titlebar_button_maximize")
            .empty()
            .append(_icons.unmaximize)
            .attr("title", settings.buttonsTexts.unmaximize);
        PopupWindow2.find(".PopupWindow2_statusbar_handle *, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_collapse").hide();
        if (settings.draggable) PopupWindow2.find(".PopupWindow2_titlebar").removeClass("PopupWindow2_titlebar_draggable");
        if (!settings.modal) PopupWindow2.data("overlay").css("background-color", "transparent").width("100%").height("100%");
        
        _SaveCurrentPosition(PopupWindow2);
        _SaveCurrentSize(PopupWindow2);
        var defPosition = _ChangePosition(PopupWindow2, {
            top     : 0,
            left    : 0
        });
        var defSize = _ChangeSize(PopupWindow2, {
            width   : "100%",
            height  : "100%"
        });
        
        return $.when(defPosition, defSize).then(function(){
            PopupWindow2.data("maximized", true);
            _TriggerEvent(PopupWindow2, "maximize");
        });
    }
    function _Unmaximize(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || !PopupWindow2.data("maximized")) return;
        var settings    = PopupWindow2.data("settings");
        var defPosition = _RestoreSavedPosition(PopupWindow2);
        var defSize     = _RestoreSavedSize(PopupWindow2);
        
        PopupWindow2.find(".PopupWindow2_titlebar_button_maximize")
            .empty()
            .append(_icons.maximize)
            .attr("title", settings.buttonsTexts.maximize);
        PopupWindow2.find(".PopupWindow2_statusbar_handle *, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_collapse").show();
        if (settings.draggable) PopupWindow2.find(".PopupWindow2_titlebar").addClass("PopupWindow2_titlebar_draggable");
        if (!settings.modal) PopupWindow2.data("overlay").width(0).height(0).css("background-color", "");
        
        return $.when(defPosition, defSize).then(function(){
            PopupWindow2.data("maximized", false);
            _TriggerEvent(PopupWindow2, "unmaximize");
        });
    }
    
    function _Collapse(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || PopupWindow2.data("maximized") || PopupWindow2.data("collapsed") || PopupWindow2.data("minimized")) return;
        var settings = PopupWindow2.data("settings");
        
        PopupWindow2.find(".PopupWindow2_titlebar_button_collapse")
            .empty()
            .append(_icons.uncollapse)
            .attr("title", settings.buttonsTexts.uncollapse);
        PopupWindow2.find(".PopupWindow2_content, .PopupWindow2_statusbar, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_maximize, .PopupWindow2_titlebar_button_minimize").hide();
        
        _SaveCurrentSize(PopupWindow2);
        var defSize = _ChangeSize(PopupWindow2, {
            width   : settings.collapsedWidth,
            height  : _GetBordersWidth(PopupWindow2, "top") + _GetBordersWidth(PopupWindow2, "bottom") + PopupWindow2.find(".PopupWindow2_titlebar").outerHeight()
        });
        
        return $.when(defSize).then(function(){
            PopupWindow2.data("collapsed", true);
            _TriggerEvent(PopupWindow2, "collapse");
        });
    }
    function _Uncollapse(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || !PopupWindow2.data("collapsed")) return;
        var settings    = PopupWindow2.data("settings");
        var defSize     = _RestoreSavedSize(PopupWindow2);
        
        PopupWindow2.find(".PopupWindow2_titlebar_button_collapse")
            .empty()
            .append(_icons.collapse)
            .attr("title", settings.buttonsTexts.collapse);
        PopupWindow2.find(".PopupWindow2_content, .PopupWindow2_statusbar, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_maximize, .PopupWindow2_titlebar_button_minimize").show();
        
        return $.when(defSize).then(function(){
            PopupWindow2.data("collapsed", false);
            _TriggerEvent(PopupWindow2, "uncollapse");
        });
    }
    
    function _Minimize(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || PopupWindow2.data("collapsed") || PopupWindow2.data("minimized")) return;
        var defRet      = $.Deferred();
        var settings    = PopupWindow2.data("settings");
        var defUnmaximize;
        if (PopupWindow2.data("maximized")) {
            var savedAnimationTime = settings.animationTime;
            settings.animationTime = settings.animationTime / _constants.secondaryAnimationTimeFactor;
            defUnmaximize = _Unmaximize(PopupWindow2);
            settings.animationTime = savedAnimationTime;
        } else {
            _SaveCurrentPosition(PopupWindow2);
            _SaveCurrentSize(PopupWindow2);
            defUnmaximize = $.Deferred().resolve();
        }
        $.when(defUnmaximize).then(function(){
            PopupWindow2.addClass("PopupWindow2_minimized").width("");
            PopupWindow2.find(".PopupWindow2_titlebar_button_minimize").attr("title", settings.buttonsTexts.unminimize);
            PopupWindow2.find(".PopupWindow2_content, .PopupWindow2_statusbar, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_maximize, .PopupWindow2_titlebar_button_collapse").hide();
            if (settings.draggable) PopupWindow2.find(".PopupWindow2_titlebar").removeClass("PopupWindow2_titlebar_draggable");
            var minPlaceholder  = PopupWindow2.data("minPlaceholder");
            var minimizedSize   = {
                width   : PopupWindow2.outerWidth(),
                height  : _GetBordersWidth(PopupWindow2, "top") + _GetBordersWidth(PopupWindow2, "bottom") + PopupWindow2.find(".PopupWindow2_titlebar").outerHeight()
            };
            minPlaceholder
                .outerWidth(minimizedSize.width)
                .outerHeight(minimizedSize.height)
                .show();
            
            var minPlaceholderAnimation = {};
            var newPosition             = minPlaceholder.position();
            if (_minimizedArea.direction == "horizontal") {
                minPlaceholderAnimation.width = minimizedSize.width;
                minPlaceholder.width(0);
            } else {
                minPlaceholderAnimation.height = minimizedSize.height;
                minPlaceholder.height(0);
            }
            var defPosition = _ChangePosition(PopupWindow2, newPosition);
            var defSize     = _ChangeSize(PopupWindow2, {
                height  : minimizedSize.height
            });
            minPlaceholder.animate(minPlaceholderAnimation, {
                duration    : settings.animationTime,
                queue       : false,
                complete    : function(){
                    $(this).hide();
                    PopupWindow2.css({
                        position    : "relative",
                        top         : "",
                        left        : ""
                    }).insertAfter(PopupWindow2.data("overlay"));
                }
            });
            $.when(defPosition, defSize).then(function(){
                PopupWindow2.data("minimized", true);
                _TriggerEvent(PopupWindow2, "minimize");
                defRet.resolve();
            });
        });
        return defRet.promise();
    }
    function _Unminimize(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2) || !PopupWindow2.data("opened") || !PopupWindow2.data("minimized")) return;
        var settings        = PopupWindow2.data("settings");
        var minPlaceholder  = PopupWindow2.data("minPlaceholder");
        
        PopupWindow2.removeClass("PopupWindow2_minimized");
        PopupWindow2.find(".PopupWindow2_titlebar_button_minimize").attr("title", settings.buttonsTexts.minimize);
        PopupWindow2.find(".PopupWindow2_content, .PopupWindow2_statusbar, .PopupWindow2_resizer, .PopupWindow2_titlebar_button_maximize, .PopupWindow2_titlebar_button_collapse").show();
        if (settings.draggable) PopupWindow2.find(".PopupWindow2_titlebar").addClass("PopupWindow2_titlebar_draggable");
        
        minPlaceholder.show().insertAfter(PopupWindow2.data("overlay"));
        var minimizedSize           = {
            width   : minPlaceholder.outerWidth(),
            height  : minPlaceholder.outerHeight()
        };
        var minPlaceholderAnimation = {};
        var newPosition             = minPlaceholder.position();
        if (_minimizedArea.direction == "horizontal") {
            minPlaceholderAnimation.width = 0;
            minPlaceholder.width(minimizedSize.width);
        } else {
            minPlaceholderAnimation.height = 0;
            minPlaceholder.height(minimizedSize.height);
        }
        PopupWindow2.css({
            position    : "absolute",
            top         : newPosition.top,
            left        : newPosition.left,
            width       : minimizedSize.width
        }).appendTo(PopupWindow2.data("overlay"));
        
        var defPosition = _RestoreSavedPosition(PopupWindow2);
        var defSize     = _RestoreSavedSize(PopupWindow2);
        minPlaceholder.animate(minPlaceholderAnimation, {
            duration    : settings.animationTime,
            queue       : false,
            complete    : function(){
                $(this).hide();
            }
        });
        
        return $.when(defPosition, defSize).then(function(){
            PopupWindow2.data("minimized", false);
            _TriggerEvent(PopupWindow2, "unminimize");
        });
    }
    
    function _Destroy(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        var originalTarget = PopupWindow2.data("originalTarget");
        originalTarget.appendTo(PopupWindow2.data("originalParent"));
        if (PopupWindow2.data("minimized")) {
            PopupWindow2.remove();
        } else {
            PopupWindow2.data("overlay").remove();
        }
        originalTarget.trigger("destroy.PopupWindow2");
    }
    
    function _GetCurrentPosition(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2)) return undefined;
        return $.extend({}, PopupWindow2.data("currentPosition"));
    }
    function _SetCurrentPosition(PopupWindow2, position){
        $.extend(PopupWindow2.data("currentPosition"), position);
    }
    function _SaveCurrentPosition(PopupWindow2){
        PopupWindow2.data("savedPosition", _GetCurrentPosition(PopupWindow2));
    }
    function _RestoreSavedPosition(PopupWindow2){
        return _ChangePosition(PopupWindow2, PopupWindow2.data("savedPosition"));
    }
    function _ChangePosition(PopupWindow2, params){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        var defRet          = $.Deferred();
        var settings        = PopupWindow2.data("settings");
        var animationTime   = (params.animationTime !== undefined) ? parseInt(params.animationTime) : settings.animationTime;
        var newPosition     = {
            top     : params.top,
            left    : params.left
        };
        if (params.check) {
            if (!PopupWindow2.data("opened") || PopupWindow2.data("maximized") || PopupWindow2.data("minimized")) return;
            if (settings.keepInViewport) {
                var size    = _GetCurrentSize(PopupWindow2);
                var $window = $(window);
                if (newPosition.top > $window.height() - size.height) newPosition.top = $window.height() - size.height;
                if (newPosition.left > $window.width() - size.width) newPosition.left = $window.width() - size.width;
                if (newPosition.top < 0) newPosition.top = 0;
                if (newPosition.left < 0) newPosition.left = 0;
            }
        }
        var currentPosition = _GetCurrentPosition(PopupWindow2);
        if (currentPosition.top != newPosition.top || currentPosition.left != newPosition.left) {
            PopupWindow2.animate(newPosition, {
                duration    : animationTime,
                queue       : false,
                complete    : function(){
                    _SetCurrentPosition(PopupWindow2, newPosition);
                    if (params.event) _TriggerEvent(PopupWindow2, "move");
                    defRet.resolve();
                }
            });
        } else {
            defRet.resolve();
        }
        return defRet.promise();
    }
    function _CheckPosition(PopupWindow2){
        _ChangePosition(PopupWindow2, $.extend({
            animationTime   : PopupWindow2.data("settings").animationTime / _constants.secondaryAnimationTimeFactor,
            check           : true,
            event           : true
        }, _GetCurrentPosition(PopupWindow2)));
    }
    
    function _GetCurrentSize(PopupWindow2){
        if (!_CheckPopupWindow2(PopupWindow2)) return undefined;
        return $.extend({}, PopupWindow2.data("currentSize"));
    }
    function _SetCurrentSize(PopupWindow2, size){
        $.extend(PopupWindow2.data("currentSize"), size);
    }
    function _SaveCurrentSize(PopupWindow2){
        PopupWindow2.data("savedSize", _GetCurrentSize(PopupWindow2));
    }
    function _RestoreSavedSize(PopupWindow2){
        return _ChangeSize(PopupWindow2, $.extend({
            checkPosition   : true,
            checkSize       : false,
            event           : false
        }, PopupWindow2.data("savedSize")));
    }
    function _ChangeSize(PopupWindow2, params){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        var defRet          = $.Deferred();
        var settings        = PopupWindow2.data("settings");
        var animationTime   = (params.animationTime !== undefined) ? parseInt(params.animationTime) : settings.animationTime;
        var newSize         = {
            width   : params.width,
            height  : params.height
        };
        if (params.checkSize) {
            if (!PopupWindow2.data("opened") || PopupWindow2.data("maximized") || PopupWindow2.data("minimized")) return;
            if (settings.maxWidth && newSize.width > settings.maxWidth) newSize.width = settings.maxWidth;
            if (settings.minWidth && newSize.width < settings.minWidth) newSize.width = settings.minWidth;
            if (settings.maxHeight && newSize.height > settings.maxHeight) newSize.height = settings.maxHeight;
            if (settings.minHeight && newSize.height < settings.minHeight) newSize.height = settings.minHeight;
            if (PopupWindow2.data("collapsed")) {
                PopupWindow2.data("savedSize", $.extend({}, newSize));
                delete newSize.height;
            }
        }
        var currentSize = _GetCurrentSize(PopupWindow2);
        if (currentSize.width != newSize.width || currentSize.height != newSize.height) {
            PopupWindow2.animate(newSize, {
                duration    : animationTime,
                queue       : false,
                complete    : function(){
                    _SetCurrentSize(PopupWindow2, newSize);
                    if (params.event)           _TriggerEvent(PopupWindow2, "resize");
                    if (params.checkPosition)   _CheckPosition(PopupWindow2);
                    defRet.resolve();
                }
            });
        } else {
            defRet.resolve();
        }
        return defRet.promise();
    }
    function _CheckSize(PopupWindow2){
        _ChangeSize(PopupWindow2, $.extend({
            animationTime   : PopupWindow2.data("settings").animationTime / _constants.secondaryAnimationTimeFactor,
            checkPosition   : false,
            checkSize       : true,
            event           : true
        }, _GetCurrentSize(PopupWindow2)));
    }
    
    function _GetState(PopupWindow2){
        if (!PopupWindow2.length)            return undefined;
        if (!PopupWindow2.data("opened"))    return "closed";
        if (PopupWindow2.data("minimized"))  return "minimized";
        if (PopupWindow2.data("collapsed"))  return "collapsed";
        if (PopupWindow2.data("maximized"))  return "maximized";
        return "normal";
    }
    function _SetState(PopupWindow2, state){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        switch (state.toLowerCase()) {
            case "normal":
                if (!PopupWindow2.data("opened"))    _Open(PopupWindow2);
                if (PopupWindow2.data("minimized"))  _Unminimize(PopupWindow2);
                if (PopupWindow2.data("collapsed"))  _Uncollapse(PopupWindow2);
                if (PopupWindow2.data("maximized"))  _Unmaximize(PopupWindow2);
            break;
            case "closed":
                _Close(PopupWindow2);
            break;
            case "maximized":
                _Maximize(PopupWindow2);
            break;
            case "unmaximized":
                _Unmaximize(PopupWindow2);
            break;
            case "collapsed":
                _Collapse(PopupWindow2);
            break;
            case "uncollapsed":
                _Uncollapse(PopupWindow2);
            break;
            case "minimized":
                _Minimize(PopupWindow2);
            break;
            case "unminimized":
                _Unminimize(PopupWindow2);
            break;
        }
    }
    
    function _SetTitle(PopupWindow2, title){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        PopupWindow2.data("settings").title = title;
        PopupWindow2.find(".PopupWindow2_titlebar_text").text(title);
    }
    function _StatusBar(PopupWindow2, content){
        if (!_CheckPopupWindow2(PopupWindow2)) return;
        PopupWindow2.find(".PopupWindow2_statusbar_content").html(content);
    }
    
    function _GetBordersWidth(PopupWindow2, border){
        if (border !== undefined) return parseInt(PopupWindow2.css("border-"+border+"-width"), 10);
        return {
            top     : parseInt(PopupWindow2.css("border-top-width"), 10),
            bottom  : parseInt(PopupWindow2.css("border-bottom-width"), 10),
            left    : parseInt(PopupWindow2.css("border-left-width"), 10),
            right   : parseInt(PopupWindow2.css("border-right-width"), 10)
        };
    }
    
    function _AddDocumentMouseEventHandlers(eventData){
        eventData.PopupWindow2.fadeTo(0, eventData.opacity);
        if (!eventData.PopupWindow2.data("settings").mouseMoveEvents) eventData.PopupWindow2.data("tempSavedData", {
            position    : _GetCurrentPosition(eventData.PopupWindow2),
            size        : _GetCurrentSize(eventData.PopupWindow2)
        });
        $(document)
            .on("mousemove", eventData, _Document_MouseMove)
            .on("mouseup",   eventData, _Document_MouseUp);
    }
    
    function _TriggerEvent(PopupWindow2, eventName){
        var eventData;
        if (eventName == "move")    eventData = _GetCurrentPosition(PopupWindow2);
        if (eventName == "resize")  eventData = _GetCurrentSize(PopupWindow2);
        PopupWindow2.data("originalTarget").trigger(eventName + ".PopupWindow2", eventData);
    }
    
    function _SetMinimizedArea(){
        var flex = {};
        if (_minimizedArea.direction == "horizontal") {
            flex["flex-direction"]  = (_minimizedArea.position.indexOf("left") >= 0) ? "row" : "row-reverse";
            flex["flex-wrap"]       = (_minimizedArea.position.indexOf("top") >= 0) ? "wrap" : "wrap-reverse";
        } else {
            flex["flex-direction"]  = (_minimizedArea.position.indexOf("top") >= 0) ? "column" : "column-reverse";
            flex["flex-wrap"]       = (_minimizedArea.position.indexOf("left") >= 0) ? "wrap" : "wrap-reverse";
        }
        _mainContainer.css(flex);
    }
    
    
    function _CheckPopupWindow2(PopupWindow2){
        if (PopupWindow2.length) return true;
        _Warning("jQuery PopupWindow2 is not initialized on this element");
        return false;
    }
    
    function _Warning(message){
        message = "jQuery PopupWindow2 Warning: " + message;
        if (window.console.warn) {
            console.warn(message);
        } else if (window.console.log) {
            console.log(message);
        }
    }
    
    
    // **************************************************
    //  EVENT HANDLERS
    // **************************************************
    function _ButtonClose_Click(event){
        _Close($(event.currentTarget).closest(".PopupWindow2"));
    }
    function _ButtonMax_Click(event){
        var PopupWindow2 = $(event.currentTarget).closest(".PopupWindow2");
        if (!PopupWindow2.data("maximized")) {
            _Maximize(PopupWindow2);
        } else {
            _Unmaximize(PopupWindow2);
        }
    }
    function _ButtonCollapse_Click(event){
        var PopupWindow2 = $(event.currentTarget).closest(".PopupWindow2");
        if (!PopupWindow2.data("collapsed")) {
            _Collapse(PopupWindow2);
        } else {
            _Uncollapse(PopupWindow2);
        }
    }
    function _ButtonMin_Click(event){
        var PopupWindow2 = $(event.currentTarget).closest(".PopupWindow2");
        if (!PopupWindow2.data("minimized")) {
            _Minimize(PopupWindow2);
        } else {
            _Unminimize(PopupWindow2);
        }
    }
    
    function _Titlebar_MouseDown(event){
        if (event.target !== event.currentTarget && !$(event.target).hasClass("PopupWindow2_titlebar_text")) return false;
        var PopupWindow2     = $(event.currentTarget).closest(".PopupWindow2");
        var currentPosition = _GetCurrentPosition(PopupWindow2);
        var settings        = PopupWindow2.data("settings");
        if (!settings.modal) PopupWindow2.data("overlay").css("background-color", "transparent").width("100%").height("100%");
        _AddDocumentMouseEventHandlers({
            PopupWindow2     : PopupWindow2,
            action          : "drag",
            opacity         : settings.dragOpacity,
            compensationX   : event.pageX - currentPosition.left,
            compensationY   : event.pageY - currentPosition.top
        });
        event.preventDefault();
    }
    function _Resizer_MouseDown(event){
        var PopupWindow2     = $(event.currentTarget).closest(".PopupWindow2");
        var currentPosition = _GetCurrentPosition(PopupWindow2);
        var currentSize     = _GetCurrentSize(PopupWindow2);
        _AddDocumentMouseEventHandlers({
            PopupWindow2     : PopupWindow2,
            action          : "resize",
            dimension       : event.data.dimension,
            directionX      : event.data.directionX,
            directionY      : event.data.directionY,
            opacity         : PopupWindow2.data("settings").resizeOpacity,
            startX          : event.pageX + ((event.data.directionX == "left") ? currentSize.width : -currentSize.width),
            startY          : event.pageY + ((event.data.directionY == "top" ) ? currentSize.height : -currentSize.height),
            compensationX   : event.pageX - currentPosition.left,
            compensationY   : event.pageY - currentPosition.top
        });
        event.preventDefault();
    }
    
    function _Document_MouseMove(event){
        var PopupWindow2     = event.data.PopupWindow2;
        var settings        = PopupWindow2.data("settings");
        var currentPosition = _GetCurrentPosition(PopupWindow2);
        var currentSize     = _GetCurrentSize(PopupWindow2);
        var newPosition     = {};
        var newSize         = {};
        switch (event.data.action) {
            case "drag":
                newPosition.top  = event.pageY - event.data.compensationY;
                newPosition.left = event.pageX - event.data.compensationX;
                if (settings.keepInViewport) {
                    var size    = _GetCurrentSize(PopupWindow2);
                    var $window = $(window);
                    if (newPosition.top < 0)                                newPosition.top  = 0;
                    if (newPosition.left < 0)                               newPosition.left = 0;
                    if (newPosition.top > $window.height() - size.height)   newPosition.top  = $window.height() - size.height;
                    if (newPosition.left > $window.width() - size.width)    newPosition.left = $window.width() - size.width;
                }
            break;
            case "resize":
                if (event.data.dimension != "height" && event.pageX > 0) {
                    var newWidth = (event.data.directionX == "left") ? event.data.startX - event.pageX : event.pageX - event.data.startX;
                    if (newWidth >= settings.minWidth && (!settings.maxWidth || newWidth <= settings.maxWidth)) {
                        newSize.width = newWidth;
                        if (event.data.directionX == "left") newPosition.left = event.pageX - event.data.compensationX;
                    }
                }
                if (event.data.dimension != "width" && event.pageY > 0) {
                    var newHeight = (event.data.directionY == "top") ? event.data.startY - event.pageY : event.pageY - event.data.startY;
                    if (newHeight >= settings.minHeight && (!settings.maxHeight || newHeight <= settings.maxHeight)) {
                        newSize.height = newHeight;
                        if (event.data.directionY == "top") newPosition.top = event.pageY - event.data.compensationY;
                    }
                }
            break;
        }
        if ((newPosition.top !== undefined && newPosition.top != currentPosition.top) || (newPosition.left !== undefined && newPosition.left != currentPosition.left)) {
            PopupWindow2.css(newPosition);
            _SetCurrentPosition(PopupWindow2, newPosition);
            if (settings.mouseMoveEvents) _TriggerEvent(PopupWindow2, "move");
        }
        if ((newSize.width !== undefined && newSize.width != currentSize.width) || (newSize.height !== undefined && newSize.height != currentSize.height)) {
            PopupWindow2.outerWidth(newSize.width).outerHeight(newSize.height);
            _SetCurrentSize(PopupWindow2, newSize);
            if (settings.mouseMoveEvents) _TriggerEvent(PopupWindow2, "resize");
        }
    }
    function _Document_MouseUp(event){
        var PopupWindow2 = event.data.PopupWindow2;
        var settings    = PopupWindow2.data("settings");
        PopupWindow2.fadeTo(0, 1);
        $(document)
            .off("mousemove", _Document_MouseMove)
            .off("mouseup",   _Document_MouseUp);
        if (!settings.modal) PopupWindow2.data("overlay").width(0).height(0).css("background-color", "");
        if (!settings.mouseMoveEvents) {
            var currentPosition = _GetCurrentPosition(PopupWindow2);
            var currentSize     = _GetCurrentSize(PopupWindow2);
            var savedData       = PopupWindow2.data("tempSavedData");
            if (savedData.position.top != currentPosition.top || savedData.position.left != currentPosition.left) _TriggerEvent(PopupWindow2, "move");
            if (savedData.size.width != currentSize.width || savedData.size.height != currentSize.height)         _TriggerEvent(PopupWindow2, "resize");
            PopupWindow2.removeData("tempSavedData");
        }
    }
    
    
    $(function(){
        _mainContainer = $("<div>", {
            class   : "PopupWindow2_container"
        })
        .css(_css.container)
        .appendTo("body");
        _SetMinimizedArea();
        
        $(window).on("resize", function(){
            $(document).find(".PopupWindow2").each(function(){
                var PopupWindow2 = $(this);
                if (PopupWindow2.data("settings").keepInViewport) _CheckPosition(PopupWindow2);
            });
        });
    });
    
}(jQuery));