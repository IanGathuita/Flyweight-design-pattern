/*lets you fit more objects in the available RAM by sharing COMMON parts of state between multiple objects instead of keeping all the
data in each object. Common portion of the state is called intrinsic state, the rest (unique for each entity) is called extrinsic.
We store the intrinsic state in memory for reusability */

//change target library to es2015 or later because I use map data type

interface Shape{
    draw():void
}


class Cuboid implements Shape{
    color:string | undefined;
    length:number = 10;
    width:number= 8;
    height: number = 5;

    setColor(color:string){
        this.color = color;
    }

    draw(): void {
        console.log(`${this.color} cuboid with dimensions (${this.length},${this.width},${this.width}).`);
        
    }
}


class ShapeFactory{
    static shapeMap = new Map<string,Shape> ();

    static getShape(shapeType:string): Shape{
        let shape!:Shape;
        if(shapeType === 'cuboid'){
            if (ShapeFactory.shapeMap.has('cuboid')){
                shape = ShapeFactory.shapeMap.get('cuboid') as Shape;
            }
            else{
                shape = new Cuboid();
                ShapeFactory.shapeMap.set('cuboid',shape);
                console.log('Created a colorless cuboid in ShapeFactory')
            }
        }
        return shape;
    }

}

//client
//we can now create many cuboids, each storing its extrinsic data. They share the intrinsic state
for (let i = 0; i < 3; i++) {
    const cuboid = ShapeFactory.getShape('cuboid') as Cuboid;
    cuboid.setColor('red');
    cuboid.draw()
}

for (let i = 0; i < 3; i++) {
    const cuboid = ShapeFactory.getShape('cuboid') as Cuboid;
    cuboid.setColor('green');
    cuboid.draw()
}

