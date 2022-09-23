<template>
  <br />
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add new product
    </button>

    <br />
    <h1 style="text-align: center">My Products</h1>
    <br />
    <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
      <div class="col hp" v-for="item in products" :key="item.name">
        <div class="card1 h-100 shadow-sm">
          <a href="#">
            <img :src="item.image" class="card1-img-top" alt="product.title" />
          </a>

          <div class="label-top shadow-sm">
            <a class="text-white" href="#">{{ item.brand }}</a>
          </div>
          <div class="card-body">
            <div class="clearfix mb-3">
              <span class="float-start badge rounded-pill bg-success"
                >{{ item.price }}DT</span
              >

              <span class="float-end"
                ><a href="#" class="small text-muted text-uppercase aff-link"
                  >reviews</a
                ></span
              >
            </div>
            <h5 class="card-title">
              <a target="_blank" href="#">{{ item.description }}</a>
            </h5>

            <div class="d-grid gap-2 my-4">
              <!-- <a @click="addToCart(item)" class="btn btn-warning bold-btn"
                >add to cart</a
              > -->
              <button
                type="button"
                class="btn btn-info bold-btn"
                data-bs-toggle="modal"
                data-bs-target="#update"
                v-on:click="
                  getData(
                    item.name,
                    item.brand,
                    item.price,
                    item.description,
                    item.image,
                    item.key
                  )
                "
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger bold-btn"
                data-bs-toggle="modal"
                data-bs-target="#delete"
                v-on:click="getDataKey(item.key, item.name)"
              >
                Delete
              </button>
            </div>
            <div class="clearfix mb-1"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 1 -->
    <div
      class="modal fade"
      id="exampleModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            .
            <!-- form start here -->
            <form @submit.prevent="AddProduct">
              <input
                class="form-control"
                type="text"
                placeholder="name"
                aria-label="default input example"
                v-model="product.name"
              />
              <input
                class="form-control"
                type="text"
                placeholder="Brand"
                aria-label="default input example"
                v-model="product.brand"
              />
              <div class="input-group">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Price"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  v-model="product.price"
                />
                <span class="input-group-text">$</span>
              </div>

              <input
                class="form-control"
                lang="en"
                type="file"
                placeholder="sqs"
                accept=".jpg,.png"
                @change="previewImage"
              />
              <progress
                v-if="ProgressShow"
                id="js-progressbar"
                class="uk-progress"
                :value="uploadValue"
                max="100"
              ></progress>

              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
                v-model="product.description"
              ></textarea>
              <div class="alert alert-success" v-if="messageSuccess">
                {{ messageSuccess }}
              </div>
              <button type="submit" class="btn btn-success">Add</button>
            </form>
            <!-- form end here -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 2 (update) -->
    <div
      class="modal fade"
      id="update"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Update Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            .
            <!-- form start here -->
            <form @submit.prevent="UpdateProduct">
              <input
                class="form-control"
                type="text"
                placeholder="name"
                aria-label="default input example"
                v-model="dataProduct.name"
              />
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
                v-model="dataProduct.description"
              ></textarea>
              <input
                class="form-control"
                type="text"
                placeholder="image"
                aria-label="default input example"
                v-model="dataProduct.image"
              />
              <input
                class="form-control"
                type="number"
                pla
                ceholder="price"
                aria-label="default input example"
                v-model="dataProduct.price"
              />
              <div class="alert alert-success" v-if="messageUpdateSuccess">
                {{ messageUpdateSuccess }}
              </div>
              <button type="submit" class="btn btn-success">Update</button>
            </form>
            <!-- form end here -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 3 (delete) -->
    <div
      class="modal fade"
      id="delete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Delete Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            .
            <!-- form start here -->
            <form>
              <h3>Do you want to delete this course ?</h3>
              <br />
              <h5>Title: {{ dataProduct.name }}</h5>
            </form>
            <!-- form end here -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              id="close"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="DeleteProduct(dataProduct.key)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "../Firebase";

import {
  addDoc,
  collection,
  query,
  getFirestore,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// Create a root reference
const storage = getStorage();

const db = getFirestore();
const q = query(collection(db, "products"));
export default {
  name: "MyProductsView",
  data() {
    return {
      product: {
        name: "",
        price: 0,
        image: "",
        description: "",
        brand: "",
        uid: localStorage.getItem("uidUser"),
      },
      dataProduct: {
        name: "",
        price: 0,
        image: "",
        brand: "",
        description: "",
        key: "",
      },
      messageSuccess: "",
      messageUpdateSuccess: "",
      products: [],
      uploadValue: 0,
      ProgressShow: false,
      picture: null,
      imageData: null,
      imageName: "",
    };
  },
  methods: {
    AddProduct() {
      addDoc(
        q,

        this.product
      ).then(() => {
        this.ProgressShow = false;
        this.messageSuccess = "Added";
        this.product.name = "";
        this.product.price = "";
        this.product.image = "";
        this.product.brand = "";
        this.product.description = "";
      });
    },
    getData(name, brand, price, description, image, key) {
      this.dataProduct.name = name;
      this.dataProduct.brand = brand;
      this.dataProduct.price = price;
      this.dataProduct.description = description;
      this.dataProduct.image = image;
      this.dataProduct.key = key;
    },
    getDataKey(key, name) {
      this.dataProduct.key = key;
      this.dataProduct.name = name;
    },

    UpdateProduct() {
      const DocRef = doc(db, "products", this.dataProduct.key);
      updateDoc(DocRef, this.dataProduct).then(() => {
        this.messageUpdateSuccess = "Updated";
        this.dataProduct.name = "";
        this.dataProduct.brand = "";
        this.dataProduct.price = "";
        this.dataProduct.image = "";
        this.dataProduct.description = "";
      });
    },
    DeleteProduct(key) {
      deleteDoc(doc(db, "products", key)).then(() => {
        document.getElementById("close").click();
      });
    },
    previewImage(event) {
      this.ProgressShow = true;
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.imageName = event.target.files[0].name;
      const storageRef = ref(storage, "images/" + this.imageName);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },

        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.uploadValue = 100;
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.product.image = downloadURL;
          });
        }
      );
    },
    // addToCart(item) {
    //   this.$store.commit("addToCart", item);
    // },
  },

  created() {
    onSnapshot(q, (querySnapshot) => {
      this.products = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid == this.product.uid) {
          this.products.push({
            key: doc.id,
            name: doc.data().name,
            brand: doc.data().brand,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().image,
            quantity: 1,
            totalPrice: doc.data().price,
          });
        }
      });
    });
  },
};
</script>
<style>
.form-control {
  margin-bottom: 16px;
}
.input-group-text {
  margin-bottom: 16px;
}
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

:root {
  --font1: "Heebo", sans-serif;
  --font2: "Fira Sans Extra Condensed", sans-serif;
  --font3: "Roboto", sans-serif;

  --btnbg: #39b5ff;
  --btnfontcolor: rgb(255, 255, 255);
  --btnfontcolorhover: rgb(92, 89, 89);
  --btnbghover: #39b5ff;
  --btnactivefs: #39b5ff;

  --label-index: #960796;
  --danger-index: #5bc257;
  /* PAGINATE */
  --link-color: #000;
  --link-color-hover: #fff;
  --bg-content-color: #39b5ff;
}

.container-fluid {
  max-width: 1400px;
}

.card1 {
  background: #fff;
  position: relative;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  border: 0;
  border-radius: 1rem;
}

.card1-img,
.card1-img-top {
  border-top-left-radius: calc(1rem - 1px);
  border-top-right-radius: calc(1rem - 1px);
}

.card1 h5 {
  overflow: hidden;
  height: 55px;
  font-weight: 300;
  font-size: 1rem;
}

.card1 h5 a {
  color: black;
  text-decoration: none;
}

.card1-img-top {
  width: 100%;
  min-height: 250px;
  max-height: 250px;
  object-fit: contain;
  padding: 30px;
}

.card1 h2 {
  font-size: 1rem;
}

.card1:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* Centered text */
.label-top {
  position: absolute;
  background-color: var(--label-index);
  color: #fff;
  top: 8px;
  right: 8px;
  padding: 5px 10px 5px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
}

.top-right {
  position: absolute;
  top: 24px;
  left: 24px;

  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 900;
  background: #8bc34a;
  line-height: 90px;
  text-align: center;
  color: white;
}

.top-right span {
  display: inline-block;
  vertical-align: middle;
  /* line-height: normal; */
  /* padding: 0 25px; */
}

.aff-link {
  /* text-decoration: overline; */
  font-weight: 500;
}

.over-bg {
  background: rgba(53, 53, 53, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
}
.bold-btn {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 5px 50px 5px 50px;
}
.box .btn {
  font-size: 1.5rem;
}

@media (max-width: 1025px) {
  .btn {
    padding: 5px 40px 5px 40px;
  }
}
@media (max-width: 250px) {
  .btn {
    padding: 5px 30px 5px 30px;
  }
}

/* START BUTTON */
.btn-warning {
  background: var(--btnbg);
  color: var(--btnfontcolor);
  fill: #ffffff;
  border: none;
  text-decoration: none;
  outline: 0;
  /* box-shadow: -1px 6px 19px rgba(247, 129, 10, 0.25); */
  border-radius: 100px;
}
.btn-info {
  background: #08b21d;
  color: #ffffff;
  fill: #ffffff;
  border: none;
  text-decoration: none;
  outline: 0;
  border-radius: 100px;
}
.btn-danger {
  background: #ff0000;
  color: #ffffff;
  fill: #ffffff;
  border: none;
  text-decoration: none;
  outline: 0;
  border-radius: 100px;
}
.btn-warning:hover {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}
.btn-check:focus + .btn-warning,
.btn-warning:focus {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}
.btn-warning:active:focus {
  box-shadow: 0 0 0 0.25rem var(--btnactivefs);
}
.btn-warning:active {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}

/* END BUTTON */

.bg-success {
  font-size: 1rem;
  background-color: var(--btnbg) !important;
  color: var(--btnfontcolor) !important;
}
.bg-danger {
  font-size: 1rem;
}

.price-hp {
  font-size: 1rem;
  font-weight: 600;
  color: darkgray;
}

.amz-hp {
  font-size: 0.7rem;
  font-weight: 600;
  color: darkgray;
}

.fa-question-circle:before {
  /* content: "\f059"; */
  color: darkgray;
}

.fa-heart:before {
  color: crimson;
}
.fa-chevron-circle-right:before {
  color: darkgray;
}
</style>