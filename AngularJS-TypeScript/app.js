/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/**
 * タスク情報
 */
var TaskItem = (function () {
    function TaskItem() {
    }
    return TaskItem;
})();
/**
 * コントローラ
 */
var TaskCtrl = (function () {
    function TaskCtrl($scope) {
        this.$scope = $scope;
        // 初期値
        $scope.tasks = [
            { body: "do this 1", done: false },
            { body: "do this 2", done: false },
            { body: "do this 3", done: false },
            { body: "do this 4", done: false }
        ];
        // $scopeにメソッドをひもづける
        $scope.addNew = this.addNew.bind(this);
        $scope.deleteTask = this.deleteTask.bind(this);
        $scope.deleteDone = this.deleteDone.bind(this);
        $scope.getDoneCount = this.getDoneCount.bind(this);
    }
    /**
     * タスクの追加
     */
    TaskCtrl.prototype.addNew = function () {
        this.$scope.tasks.push({ body: this.$scope.newTaskBody, done: false });
        this.$scope.newTaskBody = ''; // テキストボックスのクリア
    };
    /**
     * タスクの削除
     * @param index 削除する行番号
     */
    TaskCtrl.prototype.deleteTask = function (index) {
        this.$scope.tasks.splice(index, 1);
    };
    /**
     * 済タスクの一括削除
     */
    TaskCtrl.prototype.deleteDone = function () {
        var _this = this;
        var oldTask = this.$scope.tasks;
        this.$scope.tasks = [];
        oldTask.forEach(function (task) {
            if (!task.done)
                _this.$scope.tasks.push(task);
        });
    };
    /**
     * 完了済み件数の取得
     * @return 完了済み件数
     */
    TaskCtrl.prototype.getDoneCount = function () {
        var count = 0;
        this.$scope.tasks.forEach(function (task) {
            count += task.done ? 1 : 0;
        });
        return count;
    };
    return TaskCtrl;
})();
//# sourceMappingURL=app.js.map