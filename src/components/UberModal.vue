<template>
  <div v-if="isOpen" class="backdrop" @click="$emit('close')">
    <Transition name="modal-fade" :duration="{ enter: 500, leave: 800 }" mode="out-in">
      <div class="popup" @click.stop :class="[{ active: isOpen }]">
        <div class="header">
          <slot name="header" @click="$emit('close')"></slot>
        </div>

        <slot name="content"></slot>
        <div class="footer">
          <slot name="actions" @click="$emit('confirm')"> </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    const handleKeydown = (e: KeyboardEvent) => {
      if (props.isOpen && e.key === 'Escape') {
        ctx.emit('close');
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      handleKeydown,
    };
  },
});
</script>

<style lang="css" scoped>
.popup {
  top: 50px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  width: 80vw;
  height: 70vh;
}

.dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 101;
  padding: 15px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.fullscreen {
  width: 100vw;
  min-height: 100vh;
  top: 0 !important;
  border-radius: 0px;
}

.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  text-align: right;
}
.header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

@-webkit-keyframes slideDown-enter {
  from {
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }
}

@keyframes slideDown-enter {
  from {
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }
}

.slideDown-enter-active {
  -webkit-animation: slideDown-enter both cubic-bezier(0.4, 0, 0, 1.5);
  animation: slideDown-enter both cubic-bezier(0.4, 0, 0, 1.5);
}

@-webkit-keyframes slideDown-leave {
  to {
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }
}

@keyframes slideDown-leave {
  to {
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }
}

.slideDown-leave-active {
  -webkit-animation: slideDown-leave both;
  animation: slideDown-leave both;
}

/* -- fade -- */
@-webkit-keyframes modal-fade-enter {
  from {
    opacity: 0;
  }
}

@keyframes modal-fade-enter {
  from {
    opacity: 0;
  }
}

.modal-fade-enter-active {
  -webkit-animation: modal-fade-enter both ease-in;
  animation: modal-fade-enter both ease-in;
}

@-webkit-keyframes modal-fade-leave {
  to {
    opacity: 0;
  }
}

@keyframes modal-fade-leave {
  to {
    opacity: 0;
  }
}

.modal-fade-leave-active {
  -webkit-animation: modal-fade-leave both ease-out;
  animation: modal-fade-leave both ease-out;
}
</style>
