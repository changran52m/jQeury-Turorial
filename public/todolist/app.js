var MyTodoList = (function() {
    var defaults = {
            // CSS selectors and attributes that would be used by the JavaScript functions
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div",
            remove: "remove"
        },
        codes = {
            "1": "#pending", // For pending tasks
            "2": "#inProgress",
            "3": "#completed"
        },
        data = {};

    var MyTodoList = function() {
        var _this = this;
        $('#datepicker').datepicker();
        _this.data = JSON.parse(localStorage.getItem('maizi')) || {};
        for (var property in _this.data) {
            if (_this.data.hasOwnProperty(property)) {
                _this.generateElement({
                    id: property,
                    code: _this.data[property].code,
                    title: _this.data[property].title,
                    date: _this.data[property].date,
                    description: _this.data[property].description
                });
            }
        }


        $('#addItem').click(function() {
            var title = $(this).siblings('.addTitle').val(),
                description = $(this).siblings('.addDescriptions').val(),
                date = $(this).siblings('.addDate').val(),
                id = Date.now() + '';
            _this.generateElement({
                id: id,
                code: "1",
                title: title,
                date: date,
                description: description
            });
            $(this).siblings('.addTitle').val(''),
            $(this).siblings('.addDescriptions').val(''),
            $(this).siblings('.addDate').val('');


            _this.data[id] = {
                code: "1",
                title: title,
                date: date,
                description: description
            };
            _this.persistData();
        });

        $('body').on('click', '.todo-task .remove', function() {
            var id = $(this).parent().attr('id').substring(defaults.taskId.length);
            _this.removeElement({
                id: id
            });
            delete _this.data[id];
            _this.persistData();
        });

        $.each(codes, function(index, value) {
            $(value).droppable({
                drop: function(event, ui) {
                    var element = ui.helper,
                        id = element.attr('id').substring(defaults.taskId.length),
                        item = _this.data[id];
                    item.code = index;
                    _this.removeElement({
                        id: id
                    });
                    _this.generateElement({
                        id: id,
                        code: item.code,
                        title: item.title,
                        date: item.date,
                        description: item.description
                    });
                    _this.persistData();
                }
            });
        });
        $('#' + defaults.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    id = element.attr('id').substring(defaults.taskId.length);
                _this.removeElement({
                    id: id
                });
                delete _this.data[id];
                _this.persistData();

            }
        });

    };

    MyTodoList.prototype.persistData = function() {
        localStorage.setItem('maizi', JSON.stringify(this.data));
    }

    MyTodoList.prototype.generateElement = function(params) {
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class": defaults.todoTask,
            "id": defaults.taskId + params.id,
            "data": params.id
        });
        $("<div />", {
            "class": defaults.remove,
            "text": 'X'
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        wrapper.appendTo(parent);
        wrapper.draggable({
            opacity: 0.5,
            start: function() {
                $('#' + defaults.deleteDiv).show('fast');
            },
            stop: function() {
                $('#' + defaults.deleteDiv).hide('fast');

            }
        });

    };
    MyTodoList.prototype.removeElement = function(params) {
        $("#" + defaults.taskId + params.id).remove();
    };
    return MyTodoList;
})();
