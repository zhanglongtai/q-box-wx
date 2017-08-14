Page({
    data: {
        task: null,
        array: [],
    },
    onLoad: function (query) {
        const { task, array } = query;
        this.setData({
            task,
            array,
        });
        
        console.log(typeof (task));
        console.log(task);
        console.log(array);
    },
});
