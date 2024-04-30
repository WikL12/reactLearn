// 规定函数的结果为数字类型
let numArr = [1, 2];
const result = numArr.find(x => x > 2) as number
result * 5
// 定义变量的类型
let str: string = '111';
// 定义变量的多个类型
let str2: string | null = null
// 定义为一个数组，其中的元素可以为任意类型
let arr: any[] = [1, 2, 3];
// 定义为一个数组，其中的元素只能为字符串类型
let arr1: Array<string> = ['2'];
// 定义为一个数组，其中的元素只能为数字类型
let arr2: number[] = [1, 2, 3, 2]
// 定义为一个数组，其中的元素只能有三个并且每个元素的类型为定义好了的，？代表可选参数
let arr3: [number, string, number] = [1, '1', 1];
let arr4: [number, string, number?] = [1, '1'];
// 枚举类型
enum Myenum {
    A, B, C
}
// 定义函数的参数类型以及返回值类型
function MyFn(a: number, b?: string): void {
    return undefined
}
// 定义接口，接口中含有的字段以及字段的类型
interface api {
    name: string,
    age: number
}
// 定义另外一个接口，继承了之前的接口类型，现在它本身含有之前接口类型的所有类型
interface apiChild extends api {
    job: string
}
// 定义一个对象，它的字段以及字段的类型必须与接口定义的一致
const obj: api = {
    name: '111',
    age: 12,
}
// 类型的集合
type myname = string | number | number[] | Array<string>
// 定义一个函数，函数的参数的类型以及返回值的类型可以在调用该函数时传入
function myfn<T>(a: T, b: T): T[] {
    return [a, b];
}
function fn(): void {

}
// 看上面那条注释
myfn<number>(1, 2);

// TS中的类
class article {
    // 公有变量 默认都为public
    public title: string
    content: string
    aaa?: string
    bbb: number = 100
    // 私有变脸，崽class之外不可被读取，不可被修改
    private time?: string
    protected time2?: string
    static time3: string
    private static time4: string

    private password: string
    // 获取私有变量的方式
    get getpassword(): string {
        return 'xxxxx'
    }
    // 设置私有变量的方式
    set setpassword(newPass: string) {
        this.password = newPass
    }

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

