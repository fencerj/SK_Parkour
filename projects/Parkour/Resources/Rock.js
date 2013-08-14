var Rock = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    _map:0,// which map belong to
    get map() {
        return this._map;
    }, 
    set map(newMap) {
        this._map = newMap; 
    },

    ctor:function (spriteSheet, space, pos) {
        this.space = space;

        this.sprite = cc.PhysicsSprite.createWithSpriteFrameName("rock.png");

        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        this.shape = new cp.BoxShape(body, 40, 40);
        this.shape.setCollisionType(SpriteTag.rock);
        this.shape.setSensor(true);

        this.space.addStaticShape(this.shape);
        spriteSheet.addChild(this.sprite);

        // Needed for collision
        body.setUserData(this);
    },

    removeFromParent:function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },
});

var gRockContentSize = null;
Rock.getContentSize = function () {
    if (null == gRockContentSize) {
        var sprite = cc.PhysicsSprite.createWithSpriteFrameName("rock.png");
        gRockContentSize = sprite.getContentSize();
    }
    return gRockContentSize;
};