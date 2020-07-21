class People {
  // name: string = ""
  private _name: string = ""
  // 属性的存取器
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    // 设置器中可以添加相关的校验逻辑
    if (value.length < 2 || value.length > 5) {
      throw new Error("名字不合法，不许使用！")
    }
    this._name = value;
  }
}

var p = new People(); 
p.name = "hello"

console.log(p.name);
