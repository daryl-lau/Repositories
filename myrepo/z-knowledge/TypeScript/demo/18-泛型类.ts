//* 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}


let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));



// ----------------------------------------------------------------------------

interface Param {
  [index: string]: any
}

class Page {
  private currentPage: number = 1; //当前页码 默认1
  private pageSize: number = 10;//每页条数 默认为10
  private sortName: string; //排序字段
  private sortOrder: string = "asc"; // 排序规则 asc | desc 默认为asc正序
  constructor(param: Param) {
    if (param["currentPage"]) {
      this.currentPage = param["currentPage"];
    }
    if (param["pageSize"]) {
      this.pageSize = param["pageSize"];
    }
    if (param["sortName"]) {
      this.sortName = param["sortName"];
    }
    if (param["sortOrder"]) {
      this.sortOrder = param["sortOrder"];
    }
  }

  public getStartNum(): number {
    return (this.currentPage - 1) * this.pageSize;
  }
}

// User实体接口定义
interface User {
  id: number;//id主键自增
  name: string;//姓名
  sex: number;//性别 1男 2女
  age: number;//年龄
  city: string;//城市
  describe: string;//描述
}

// 方法接口定义，泛型接口
interface BaseDao<T> {
  findById(id: number): T;//根据主键id查询一个实体
  findPageList(param: Param, page: Page): T[];//查询分页列表
  findPageCount(param: Param): number;//查询分页count
  save(o: T): void;//保存一个实体
  update(o: T): void;//更新一个实体
  deleteById(id: number): any;//删除一个实体
}

/**
* 接口实现类，明确指定泛型类型是User接口类型
*/
class UserDao<User> implements BaseDao<User>{
  findById(id: number): User {

    return null;
  }
  findPageList(param: Param, page: Page): User[] {
    return [];
  }
  findPageCount(param: Param): number {
    return 0;
  }
  save(o: User): void {

  }
  update(o: User): void {

  }
  deleteById(id: number) {

  }
}