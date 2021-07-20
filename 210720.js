// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  //暴力枚举
  // for (let i = 0;i<nums.length-1;i++){
  //   for (let j=i+1;j<nums.length;j++){
  //     if(target === nums[j]+nums[i]){
  //       return [i,j]
  //     }
  //   }
  // }

  // 通过map
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    console.log(map, i);

    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {

      map.set(nums[i], i)
    }
  }

}
console.log(twoSum([1, 2, 3], 4));