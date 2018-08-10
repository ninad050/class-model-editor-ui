var container = document.getElementById('container');
var rows = container.children;

// forEach method from https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
var nodeListForEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
  }
};

var sortableTable = dragula([container]);

sortableTable.on('dragend', function() {
  nodeListForEach(rows, function (index, row) {
    row.lastElementChild.textContent = index + 1;
    row.dataset.rowPosition = index + 1;
  });
});