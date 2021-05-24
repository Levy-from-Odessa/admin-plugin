<template>
  <div class="">
    loading...
    <div class="background"/>
    <div class="loader">
      <div class="yellow"></div>
      <div class="red"></div>
      <div class="blue"></div>
      <div class="violet"></div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'layoutLoader',
}
</script>


<style lang="scss" >
$yellow: #feb60a;
$red: #ff0062;
$blue: #00dbf9;
$violet: #da00f7;

.background{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(146, 146, 146, 0.158);
  z-index: 1102;
}

.loader {
  z-index: 1042;
  width: 100%;

  position: absolute;
  top: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
  div {
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    margin: 2vw;
    background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
  }
}
.yellow {
	background-color: $yellow;
}

.red {
	background-color: $red;
	animation-delay: 0.1s;
}

.blue {
	background-color: $blue;
	animation-delay: 0.2s;
}

.violet {
	background-color: $violet;
	animation-delay: 0.3s;
}

@keyframes bounce {
	0%, 50%, 100% {
		transform: scale(1);
		filter: blur(0px);
	}
	25% {
		transform: scale(0.6);
		filter: blur(3px);
	}
	75% {
		filter: blur(3px);
		transform: scale(1.4);
	}
}
</style>