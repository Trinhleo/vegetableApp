(function () {
    angular.module('app.chat')
        .config(ChatRouter);
    function ChatRouter($stateProvider) {
        $stateProvider
            .state('index.chat', {
                url: "/chat",
                templateUrl: 'app/components/chat/chat.html',
                controller: 'ChatController',
                controllerAs: 'vm'
            });
    }

})();