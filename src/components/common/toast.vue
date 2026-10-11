<template>
    <transition>
        <div class="toast" v-show="visible" :class="customClass">
            <i class="icon" :class="iconClass" v-if="iconClass !== ''"></i>
            <span class="text">{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: String,
        className: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'middle'
        },
        iconClass: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        customClass() {
            var classes = [];
            switch (this.position) {
                case 'top':
                    classes.push('placetop');
                    break;
                case 'bottom':
                    classes.push('placebottom');
                    break;
                default:
                    classes.push('placemiddle');
            }
            classes.push(this.className);
            return classes.join(' ');
        }
    }
};
</script>

<style scoped>
.toast {
    position: fixed;
    max-width: 80%;
    border-radius: 0.2rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    line-height: 0.6rem;
    font-size: 0.6rem;
    padding: 0.5rem 0.6rem;
    display: flex;
}

.icon,
.text {
    font-size: 0.6rem;
    display: block;
    text-align: left;
}

.text {
    padding-left: 0.2rem;
    line-height: 0.6rem;
    flex: 1;
}

.placetop {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
}

.placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.placebottom {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
