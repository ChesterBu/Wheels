
    let a = [90, 12, 284, 920, 573, 329, 243];
    let MergeSort = function (array) {
        let merge = function (left, right) { //并
            let res = [];
            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    res.push(left.shift());
                } else {
                    res.push(right.shift());
                }
            }
            return res.concat(left).concat(right)
        };
        let sort = function (array) { //分
            if (array.length === 1) {
                return array;
            }
            let mid = Math.floor(array.length / 2);
            let left = array.slice(0, mid);
            let right = array.slice(mid);
            return merge(sort(left), sort(right));
        };
        return sort(array);
    };
    let res = MergeSort(a);
    console.log(res);

