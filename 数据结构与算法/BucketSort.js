let a = [-10, 90, 12, 284, 920, 573, 329, 243];
//    一个数一个桶
//    let BucketSort = function (array) {
//        let negativeBucket = [],
//            Bucket = [],
//            result = [],
//            abs;
//        //入桶
//        for (let i = 0; i < array.length; i++) {
//            if (array[i] < 0) {
//                abs = Math.abs(array[i]);
//                if (!negativeBucket[abs]) {
//                    negativeBucket[abs] = [];
//                }
//                negativeBucket[abs].push(array[i])
//            } else {
//                if (!Bucket[array[i]]) {
//                    Bucket[array[i]] = [];
//                }
//                Bucket[array[i]].push(array[i])
//            }
//        }
//
//        //出桶
//        for (let i = negativeBucket.length - 1; i > 0; i--) {
//            if (negativeBucket[i]) {
//                for (let j = 0; j < negativeBucket[i].length; j++) {
//                    result.push(negativeBucket[i][j]);
//                }
//            }
//        }
//        for (let i = 0; i < Bucket.length; i++) {
//            if (Bucket[i]) {
//                for (let j = 0; j < Bucket[i].length; j++) {
//                    result.push(Bucket[i][j]);
//                }
//            }
//        }
//
//        return result;
//    }
//可以为小数排序
let BucketSortX = function (array, size) {
    let max = array[0];
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
        if (array[i] > max) {
            max = array[i];
        }
    }

    //建桶
    let bucketCount = Math.floor((max - min) / size) + 1 || 5;
    let buckets = new Array(bucketCount);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
    //入桶
    for (let i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - min) / size)].push(array[i]);
    }
    array.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        //对每个桶的元素排序
        for (let j = 1; j < buckets[i].length; j++) {
            let tmp = buckets[i][j];
            for (let k = j; k >= 0; k--) {
                if (buckets[i][k - 1] > tmp) {
                    buckets[i][k] = buckets[i][k - 1]; //错位
                } else {
                    buckets[i][k] = tmp;
                    break;
                }
            }
        }
        for (let z = 0; z < buckets[i].length; z++) {
            array.push(buckets[i][z])
        }
    }
    return array;
};
let res = BucketSortX(a, 5);
console.log(res)
