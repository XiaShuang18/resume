<template>
  <Carousel loop autoplay :autoplay-speed="5000" dots="inside" arrow="always">
    <CarouselItem v-for="item in research" :key="item.title">
      <div class="carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
              <img :src="item.src" :alt="item.title" />
            </div>
            <div class="text-holder">
              <h3>{{ item.title }}</h3>
              <h4>by {{ item.org }}</h4>
            </div>
          </div>
          <p>
            {{ item.abstract }}
          </p>
          <em class="date"> {{ item.date }} </em>
          <ButtonGroup shape="circle">
            <Button
              v-if="item.repo"
              type="info"
              ghost
              target="_blank"
              :to="item.repo"
            >
              <Icon type="logo-github" />
              {{ $t('research.repo') }}
            </Button>
            <Button
              v-if="item.paper_url"
              type="info"
              ghost
              target="_blank"
              :to="item.paper_url"
            >
              {{ $t('research.paper_url') }}
              <Icon type="logo-rss" />
            </Button>
            <Button
              v-if="item.paper_file"
              type="info"
              ghost
              target="_blank"
              :to="item.paper_file"
            >
              {{ $t('research.paper_file') }}
              <Icon type="logo-rss" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
import { research } from 'assets/reader'
export default {
  name: 'Research',
  data() {
    return {
      research,
    }
  },
}
</script>

<style scoped>
.carousel {
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #fff;
}

.cycle-gallery {
  position: relative;
  text-align: center;
  padding: 40px 200px 33px;
  margin: 0 0 60px;
  line-height: 1.6;
}

.cycle-gallery p {
  color: #515a6e;
}

.cycle-gallery .img-box {
  display: block;
  line-height: 1.5;
  padding: 0 0 40px;
}

.cycle-gallery .img-box .img-holder {
  display: inline-block;
  vertical-align: middle;
  margin: 0 22px 0 0;
  overflow: hidden;
}

.attachment img {
  height: 300px;
}

.cycle-gallery .img-box .img-holder img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.cycle-gallery .img-box .text-holder {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
}

.cycle-gallery .img-box h3 {
  margin: 0;
  line-height: 1.33333;
  color: #635c73;
}

.cycle-gallery .img-box a {
  font-weight: bold;
}

.cycle-gallery::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 180px;
  right: 180px;
  height: 1px;
  background: #f4f4f4;
}

.cycle-gallery .date {
  display: block;
  font-style: normal;
  line-height: 1.5;
  font-weight: normal;
  color: #848e97;
}
</style>
