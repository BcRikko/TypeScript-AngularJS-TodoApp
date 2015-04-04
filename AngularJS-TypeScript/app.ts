/// <reference path="scripts/typings/angularjs/angular.d.ts" />

/**
 * タスク情報
 */
class TaskItem {
    body: string;
    done: boolean;
}

/**
 * アプリ用スコープのインターフェース（ng.IScopeを拡張）
 */
interface ITaskScope extends ng.IScope {
    // taskが入った配列
    tasks: Array<TaskItem>;

    // 画面のテキストボックス
    newTaskBody: string;

    // 定義するメソッド
    addNew: typeof TaskCtrl.prototype.addNew;
    deleteTask: typeof TaskCtrl.prototype.deleteTask;
    deleteDone: typeof TaskCtrl.prototype.deleteDone;
    getDoneCount: typeof TaskCtrl.prototype.getDoneCount;
}

/**
 * コントローラ
 */
class TaskCtrl {
    constructor(private $scope: ITaskScope) {
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
    addNew(): void {
        this.$scope.tasks.push({ body: this.$scope.newTaskBody, done: false });
        this.$scope.newTaskBody = '';   // テキストボックスのクリア
    }

    /**
     * タスクの削除
     * @param index 削除する行番号
     */
    deleteTask(index: number): void {
        this.$scope.tasks.splice(index, 1);
    }

    /**
     * 済タスクの一括削除
     */
    deleteDone(): void {
        var oldTask = this.$scope.tasks;
        this.$scope.tasks = [];

        oldTask.forEach(task => {
            if (!task.done) this.$scope.tasks.push(task);
        });
    }
   
    /**
     * 完了済み件数の取得
     * @return 完了済み件数
     */
    getDoneCount(): number {
        var count = 0;
        this.$scope.tasks.forEach(task => {
            count += task.done ? 1 : 0;
        });

        return count;
    }
}