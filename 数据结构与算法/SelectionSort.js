
    let array = [90, 12, 284, 920, 573, 329, 243];
    let SelectionSort = function (a) {

        for (let i = 0; i < a.length; i++) {
            let min = i;
            for (let j = i+1; j < a.length; j++) {
                if (a[j] < a[min]) {
                    min = j;
                }
            }
            let tmp = a[i];
            a[i] = a[min];
            a[min] = tmp;
        }
        return a;
    };

    let res = SelectionSort(array);
    console.log(res);
