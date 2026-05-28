namespace SpriteKind {
    export const TiroInimigo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.TiroInimigo, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 100)
    sprites.destroy(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    TiroPlayer = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c c . . . . . . . 
        . . . . . . . c c . . . . . . . 
        . . . . . . . c c . . . . . . . 
        . . . . . . c c c c . . . . . . 
        . . . . . . c 2 4 c . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, NavePlayer, 0, -100)
    TiroPlayer.setFlag(SpriteFlag.AutoDestroy, true)
    pause(350)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TiroInimigo, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.trail, 500)
    info.changeScoreBy(1)
})
info.onScore(20, function () {
    Nivel += 1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    barraVida = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite)
    if (barraVida) {
        barraVida.value -= 50
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
let NovoTiro: Sprite = null
let statusbar: StatusBarSprite = null
let SpawnInimigo = 0
let NaveInimigo: Sprite = null
let Nivel = 0
let TiroPlayer: Sprite = null
let NavePlayer: Sprite = null
let TiroInimigo2 = null
let barraVida: StatusBarSprite = null
game.showLongText("Aperte espaço para atirar e <-- --> para andar.", DialogLayout.Bottom)
game.showLongText("Destrua as naves inimigas e tome cuidado com os tiros delas. ", DialogLayout.Bottom)
effects.starField.startScreenEffect(2000)
NavePlayer = sprites.create(img`
    . . . . . . . . . . . . . . . . . 
    . . . . . . . a a . . . . . . . . 
    . . . . . . a a a a . . . . . . . 
    . . . . . b a a a a a . . . . . . 
    . . . . b b f f f f a a . . . . . 
    . . . . a a f f f f a a . . . . . 
    . . . . a a f f f f a a . . . . . 
    . . . . a a f f f f a a . . . . . 
    . . b a a a a a a a a a a b . . . 
    . b b a a a a a a a a a a a a . . 
    . a a a a a a a a a a a a a a . . 
    . a a a a a a a a a a a a a a . . 
    . a a a a a a b b a a a a a b . . 
    . a a b a . . . . . . a a a b . . 
    . a b b a . . . . . . a a a b . . 
    . . 2 4 . . . . . . . . 2 4 . . . 
    `, SpriteKind.Player)
controller.moveSprite(NavePlayer, 100, 0)
NavePlayer.setPosition(80, 100)
NavePlayer.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
game.onUpdateInterval(2000, function () {
    NaveInimigo = sprites.create(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . 2 4 . . . . . . . . . 2 4 . . . 
        7 7 7 7 . . . . . . . 7 7 7 7 . . 
        7 7 7 7 7 . . . . . 7 7 7 7 7 . . 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . 7 7 7 7 7 f f f 7 7 7 7 7 . . . 
        . 7 7 . 7 7 f f f 7 7 . 7 7 . . . 
        . 7 . . 7 7 f f f 7 7 . . 7 . . . 
        . . . . . 7 7 7 7 7 . . . . . . . 
        . . . . . . 7 7 7 . . . . . . . . 
        . . . . . . . 7 . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    SpawnInimigo = randint(0, scene.screenWidth())
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.max = 100
    statusbar.value = 100
    statusbar.attachToSprite(NaveInimigo, 5, 0)
    NaveInimigo.setPosition(SpawnInimigo, 0)
    NaveInimigo.setVelocity(0, 30)
    NaveInimigo.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        NovoTiro = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 7 4 2 7 . . . . . . 
            . . . . . . 7 7 7 7 . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.TiroInimigo)
        NovoTiro.setPosition(value.x, value.y)
        NovoTiro.setVelocity(0, 50)
        NovoTiro.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
