<template>
  <div v-loading="loading">
    图片格式，且不超过{{ size }}KB
    <el-upload
      action
      name="upload"
      :action="upload"
      :headers="headers"
      :on-success="_success"
      :before-upload="_before"
      :show-file-list="false"
    >
      <el-image :src="resizeImage(current, 0, 80)" v-if="current"></el-image>
      <div class="upimg" v-else>
        <i class="el-icon-plus add-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getUploadUrl, getUploadHeaders } from "../../apis/upload";

export default {
  model: {
    prop: "current",
    event: "changed"
  },
  props: {
    current: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 500
    }
  },
  data() {
    return {
      url: "",
      loading: false,
      upload: getUploadUrl(),
      headers: getUploadHeaders()
    };
  },
  methods: {
    _before(e) {
      const checkSzie = () => {
        return e.size / 1024 / 1024 < this.size / 1024;
      };
      const checkType = () => {
        return ["image/jpeg", "image/gif", "image/png"].indexOf(e.type) >= 0;
      };
      if (!checkType()) {
        this.error("文件格式错误");
        return false;
      }
      if (!checkSzie()) {
        this.error("文件大小不能超过500KB!");
        return false;
      }
      this.loading = true;
      return true;
    },
    _success(data) {
      this.loading = false;
      if (data.code == 0 && data.data && data.data.url) {
        this.url = data.data.url;
        this.$emit("changed", this.url);
      } else {
        this.error(data.err || data.msg || "上传失败");
      }
    }
  }
};
</script>

