var UIIdleTimeout = function () {

    return {

        //main function to initiate the module
        init: function () {

            $('body').append('<div class="modal fade" id="idletimer_warning_dialog" data-backdrop="static"><div class="modal-dialog modal-small"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Your session is about to expire.</h4></div><div class="modal-body"><p><i class="fa fa-warning"></i> You session will be locked in <span id="countdownDisplay"></span> seconds.</p><p>Do you want to continue your session?</p></div><div class="modal-footer"><button id="idletimer_logout" type="button" class="btn btn-default">No, Logout</button><button id="idletimer_keepalive" type="button" class="btn btn-primary" data-dismiss="modal">Yes, Keep Working</button></div></div></div></div>');

/*
            // start the idle timer plugin
            $.idleTimeout('#idle-timeout-dialog', '.modal-content button:last', {
                idleAfter: 5 * 60, // 5 minutes
                timeout: 30000, //30 seconds to timeout
                pollingInterval: 5, // 5 seconds
                keepAliveURL: 'assets/idletimeout_keepalive.php',
                serverResponseEquals: 'OK',
                onTimeout: function(){
                    window.location = "/sessions/logout";
                },
                onIdle: function(){
                    $('#idle-timeout-dialog').modal('show');
                    $countdown = $('#idle-timeout-counter');

                    $('#idle-timeout-dialog-keepalive').on('click', function () {
                        $('#idle-timeout-dialog').modal('hide');
                    });

                    $('#idle-timeout-dialog-logout').on('click', function () {
                        $('#idle-timeout-dialog').modal('hide');
                        $.idleTimeout.options.onTimeout.call(this);
                    });
                },
                onCountdown: function(counter){
                    $countdown.html(counter); // update the counter
                }
            });
*/

            $(document).idleTimeout({
                idleTimeLimit: 20 * 60, //20 minutes
                redirectUrl: '/sessions/logout',
                sessionKeepAliveTimer: false
            });

            $('.logout_button').on('click', function () {
                if (store.enabled) {
                    store.set('idleTimerLoggedOut', true);
                    window.location.href = '/sessions/logout';
                } else {
                    alert('Please disable "Private Mode", or upgrade to a modern browser. Or perhaps a dependent file missing. Please see: https://github.com/marcuswestin/store.js')
                }
            });

        }

    };

}();