# JS哈希表的实现
#### 数组进行插入的时候，效率比较低，数组进行查找的时候：
1. 如果基于下标 则很快O(1)
2. 如果基于内容去查找，则很低

#### 数组进行删除的时候，效率低，数组进行修改的时候：
1. 如果基于下标 则很快O(1)
2. 如果基于内容，则很低

> 哈希表通常是基于数组实现的

优势：
- 插入-删除-查找 巨快
- 查找的速度比树还要快
- 编码比数简单

劣势：
- key不能重复，数值存放是无序的。

**实现的关键地方：**

数组下标值的转换。通过哈希函数实现获取index。

 1. 将字符串转换成比较大的数字，这个数字称为hashCode
 2. 将大的数字压缩到数组(size)范围之内既index

### 公式：
```
hashCode = hashCode * prime + key.charCodeAt(i);(快速计算）
var index = hashCode % size;
```
(霍纳法则prime为质数，且小于数组的容量。size为哈希表的长度)

## 哈希表扩容

*1.为什么要扩容？*

哈希表中存储的元素个数不够存放，或者链地址法长度很长。

*2.注意点*

一旦扩容，所有数据都要重新插入。

理由：
求余运算，例如12=2，但是如果12%20呢 那就为12了。

*3.什么情况下扩容/缩容*

loadFactor = 表中元素个数/表的长度
loadFactor > 0.75 扩容
loadFactor < 0.25 缩容

每次插入或则删除键值对的时候，就进行一次判断。

### 好的哈希函数的特点：
1. 快速的计算（通过简单的运算就可以得到hashCode）
方法：霍纳法则

2. 均匀的分布
需要使用常量的地方尽量使用质数
例如哈希表的长度为质数（index)

3. 解决冲突（既是存放数据如果下标重合的解决方法）
 
3.1链地址法

存放数据的数组里面每一个下标不在是单纯的基本数据类型，而是引用类型。
引用类型有两种：`链表结构`，`数组结构`

3.2开放地址法

寻找哈希表里面空白的下标来添加重复的数据

查找重复的数据

找到之后线性往下查到，遇到空值返回

删除数据

考虑到查找数据的问题，所以删除数据时将数据赋值为-1。避免重复的数据因为空值查找不到

```js
/**
 * 哈希表 链地址法
 */
function HashTable() {
    this.storage = [];  // 存放元素
    this.count = 0;  // 存放的元素个数
    this.limit = 7;    // 哈希表的长度 尽量为质数

    /**
     * 哈希函数
     * 作用：返回key在哈希表的中的下标位置
     * 参数：key（String） size(哈希表长度)
     */
    HashTable.prototype.hashFunc = function (key, size) {
        // 1.定义hashCode变量
        var hashCode = 0;

        // 2.霍纳法则计算hashCode的值
        for (var i = 0; i < key.length; i++) {
            var zishu = 37;     // 赋值成质数
            hashCode = hashCode * zishu + key.charCodeAt(i);
        }

        // 3.取余操作
        var index = hashCode % size;

        return index;
    }

    /**
     * 作用：添加或者修改操作
     * 参数：key（String） value(Any)
     */
    HashTable.prototype.push = function(key,value) {

        // 1.根据key获取index
        var index = this.hashFunc(key,this.limit);
        
        // 2.根据index获取bukcet
        var bucket = this.storage[index];           // bucket 代表存储相同key的桶
        
        // 3.判断bucket是否存在,如果不存在 则赋值为[]
        if(bucket == null) {
            bucket = [];
            this.storage[index] = bucket;
        }

        // 4.判断bucket里面的tuple是修改还是添加
        for(var i = 0; i < bucket.length; i++ ) {
            var temp = bucket[i];
            if(temp[0] == key) {
                temp[1] =  value;
                return;                 // 这里判断为修改 直接结束该方法
            }
        }
        bucket.push([key,value]);       // 添加

        // 5.当前哈希表元素个数+1
        this.count ++;

        // 6.判断是否需要扩容
        var loadFactor =  this.count / this.limit;
        if( loadFactor > 0.75) {
            var newLimit = this.limit*2;
            while(!this.isPrime(newLimit)) {
                newLimit++;
            }
            this.reSize(newLimit);
        }

    }
    /**
     * 作用：根据key获取value
     * 参数: key(String)
     * 返回：找的到返回value 找不到返回null
     */
    HashTable.prototype.get = function(key) {
        //1.根据key获取index
        var index = this.hashFunc(key,this.limit);

        //2.根据index获取bucket(array)
        var bucket = this.storage[index];

        //3.判断bucket是否存在
        if(bucket == null) {
            return null;
        }

        //4.根据key从bucket中获取tuple(数组)
        var tuple = [];
        for(var i = 0; i < bucket.length; i++) {
            tuple = bucket[i];
            if(tuple[0] == key) {
                break;
            }
        }
        //5.根据tuple返回结果
        return tuple.length == 0 ? null : tuple[1];
    }

    /**
     * 作用：根据key删除一个truple(array)
     * 参数: key(String)
     * 返回: 删除的元素的value
     */
    HashTable.prototype.remove = function(key) {
        // 1.根据key找到index
        var index = this.hashFunc(key,this.limit);

        // 2.根据index获取bucket
        var bucket = this.storage[index];

        // 3.判断bucket是否存在
        if(bucket == null) return
        
        // 4.根据key从bucket中删除tuple(数组)
        for(var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i];
            if(tuple[0] == key) {
               // delete tuple;     // 这种可行否？ 不行，delete 只对对象的属性有效
               bucket.splice(i,1);
                break;
            }
        }
        // 5.哈希表长度-1
        this.count--;

        // 6.判断是否需要缩容
        var loadFactor =  this.count / this.limit;
        if( loadFactor < 0.25  && this.limit < 7) {
            var newLimit = parseInt(Math.floor(limit/2));
            while(!this.isPrime(newLimit)) {
                newLimit++;
            }
            this.reSize(newLimit);
        }

        return tuple[1];
    }

    /**
     * 判断哈希表是否为空
     */
    HashTable.prototype.isEmpty = function(){
        return this.count == 0 ? true : false;
    }
    /**
     * 判断哈希表元素的个数
     */
    HashTable.prototype.size = function(){
        return this.count
    }

    /**
     * 哈希表扩容
     * 参数limit哈希表新的长度。
     */
    HashTable.prototype.reSize = function(limit){
        //1.创建oldStorage指向当前storage
        var oldStorage = this.storage;
        //2.重置当前链表属性
        this.storage = [];
        this.limit = limit;
        this.count = 0;
        //3.逐个赋值
        for(var i = 0; i < oldStorage.length; i++){
            var bucket = oldStorage[i];
            if(bucket==null) {
                continue;
            }
            for(var j = 0; j < bucket.length; j++) {
                var tuple = bucket[j];
                this.push(tuple[0],tuple[1]);
            }
        }
    }

    /**
     * 判断是否为质数
     * 参数num 
     */
    HashTable.prototype.isPrime = function(num) {
        
        var  temp = parseInt(Math.sqrt(num))
    
        for(var i = 2; i <= temp;i++ ) {
            if(num%i == 0) {
                return false;
            }
        }
        return true
    }

    /**
     * 打印哈希表
     */
    HashTable.prototype.toString = function(){
        for (const key in this.storage) {
            if (this.storage.hasOwnProperty(key)) {
                let bucket = this.storage[key];
                let str = "";
                for (const key1 in bucket) {
                    if (bucket.hasOwnProperty(key1)) {
                        let  tuple = bucket[key1];
                        str = str + " " + tuple[1];
                    }
                }
                console.log(str);
            }
        }
    }
}

var hash = new HashTable();

hash.push("我","wo")
hash.push("是","shi")
hash.push("你","ni")
hash.push("你3","ni1")
hash.push("你1","ni2")
hash.push("你3","ni3")
hash.push("你5","ni5")
hash.push("你6","ni6")
hash.push("你8","ni8")
hash.push("你9","ni9") 
hash.push("你01","ni10")
hash.push("你1","ni8")
hash.push("你3","ni9")
hash.push("你9","ni10")

hash.toString();
console.log("------------------------------------")
hash.remove("是");
hash.toString();
```