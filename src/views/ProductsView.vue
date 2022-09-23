<template>
  <br />
  <div class="container">
    <h1 style="text-align: center">Products</h1>

    <div
      class="container-fluid bg-trasparent my-4 p-3"
      style="position: relative"
    >
      <div
        class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3"
        v-if="loading == false"
      >
        <div class="col hp" v-for="item in products" :key="item.name">
          <div class="card1 h-100 shadow-sm">
            <a href="#">
              <img
                :src="item.image"
                class="card1-img-top"
                alt="product.title"
                @click="GoToDetails(item.name)"
              />
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
                  ><a
                    href="#"
                    class="small text-muted text-uppercase aff-link"
                    @click="GoToDetails(item.name)"
                    >More
                  </a></span
                >
              </div>
              <h5 class="card-title">
                <a target="_blank" @click="GoToDetails(item.name)">{{
                  item.description
                }}</a>
              </h5>

              <div class="d-grid gap-2 my-4">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="
                    addToCart(item),
                      getData(
                        item.name,
                        item.brand,
                        item.price,
                        item.description,
                        item.image,
                        item.key
                      )
                  "
                  class="btn btn-warning bold-btn"
                >
                  add to cart
                </button>
              </div>
              <div class="clearfix mb-1">
                <span class="float-start"
                  ><a href="#"><i class="fas fa-question-circle"></i></a
                ></span>

                <span class="float-end">
                  <i class="far fa-heart" style="cursor: pointer"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example" v-if="loadingPagination == false">
      <ul class="pagination justify-content-center">
        <li v-if="DesablePrevious" class="page-item" @click="Previous">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item" v-for="n in ProductsNumber" :key="n">
          <a class="page-link" href="#" @click="LoadPage(n)">{{ n }}</a>
        </li>

        <li v-if="DesableNext == false" class="page-item" @click="Next">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content" style="border: black">
        <div class="modal-header" style="background: #242121; color: white">
          <div class="r" style="display: flex; margin: auto">
            <img src="../assets/icons8_Done_64px_1.png" style="height: 31px" />
            <h5 class="modal-title" id="exampleModalLabel">
              Product added to cart successfully
            </h5>
          </div>
        </div>
        <div class="modal-body" style="display: flex">
          <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="dataProduct.image"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ dataProduct.name }}</h5>
                  <h6 class="card-text">{{ dataProduct.brand }}</h6>
                  <br />
                  <h6 class="card-text">Price : {{ dataProduct.price }} DT</h6>
                  <p class="card-text">
                    There are {{ $store.state.count }} items in your cart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="close"
            class="btn btn-dark"
            data-bs-dismiss="modal"
          >
            Continue shopping
          </button>
          <button type="submit" class="btn btn-dark" @click="Gotocart">
            Order
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</template>

<script>
import {
  collection,
  query,
  getFirestore,
  orderBy,
  limit,
  getDocs,
  startAfter,
  onSnapshot,
  endBefore,
  startAt,
  endAt,
} from "firebase/firestore";
import router from "../router";
const db = getFirestore();
const q = query(collection(db, "products"));
export default {
  name: "ProductsView",
  data() {
    return {
      dataProduct: {
        name: "",
        price: 0,
        image: "",
        brand: "",
        description: "",
        key: "",
      },
      products: [],
      loading: true,
      loadingPagination: true,
      lastVisible: "",
      firstVisible: "",
      ProductsNumber: 0,
      ProductsPerPage: 4,
      currentPage: 1,
      DesableNext: false,
      DesablePrevious: true,
      name: "",
    };
  },
  created() {
    onSnapshot(q, (Snapshot) => {
      Snapshot.forEach(() => {
        this.ProductsNumber++;
      });
      if (this.ProductsNumber % this.ProductsPerPage == 0) {
        this.ProductsNumber = parseInt(
          this.ProductsNumber / this.ProductsPerPage
        );
      } else {
        this.ProductsNumber =
          parseInt(this.ProductsNumber / this.ProductsPerPage) + 1;
      }
      this.loadingPagination = false;
    });
    // Query the first page of docs
    const first = query(
      collection(db, "products"),
      orderBy("price"),
      limit(this.ProductsPerPage)
    );
    this.DesablePrevious = false;
    getDocs(first).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
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
        this.loading = false;
      });
      this.firstVisible =
        querySnapshot.docs[querySnapshot.docs.length - this.ProductsPerPage];
      this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const next1 = query(
        collection(db, "products"),
        orderBy("price"),
        startAfter(this.lastVisible),
        limit(1)
      );

      getDocs(next1).then((docSnap) => {
        docSnap.forEach((doc) => {
          this.name = doc.data().name;
        });
      });
    });
  },
  methods: {
    addToCart(item) {
      this.$store.commit("addToCart", item);
    },
    getData(name, brand, price, description, image, key) {
      this.dataProduct.name = name;
      this.dataProduct.brand = brand;
      this.dataProduct.price = price;
      this.dataProduct.description = description;
      this.dataProduct.image = image;
      this.dataProduct.key = key;
    },
    Gotocart() {
      router.push("/cart");
      document.getElementById("close").click();
    },
    GoToDetails(key) {
      this.$router.push({ name: "details", params: { id: key } });
    },
    Next() {
      this.loading = true;
      this.currentPage++;
      console.log(this.currentPage);
      const next = query(
        collection(db, "products"),
        orderBy("price"),
        startAfter(this.lastVisible),
        limit(this.ProductsPerPage)
      );
      getDocs(next).then((querySnapshot) => {
        this.products = [];
        this.name = "";
        querySnapshot.forEach((doc) => {
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
        });
        this.DesablePrevious = true;
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible =
          querySnapshot.docs[querySnapshot.docs.length - this.ProductsPerPage];
        const next1 = query(
          collection(db, "products"),
          orderBy("price"),
          startAfter(this.lastVisible),
          limit(1)
        );
        getDocs(next1).then((docSnap) => {
          docSnap.forEach((doc) => {
            this.name = doc.data().name;
          });
          if (this.name == "") {
            this.DesableNext = true;
          } else {
            console.log(this.name);
          }
        });
        this.loading = false;
      });
    },
    Previous() {
      this.loading = true;
      this.currentPage--;

      const previous = query(
        collection(db, "products"),
        orderBy("price"),
        endBefore(this.firstVisible)
      );
      getDocs(previous).then((querySnapshot) => {
        this.products = [];
        this.name = "";
        // this.DesablePrevious = true;
        this.DesableNext = false;
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible =
          querySnapshot.docs[querySnapshot.docs.length - this.ProductsPerPage];
        if (querySnapshot.docs.length - this.ProductsPerPage == 0) {
          this.DesablePrevious = false;
        }
        const previous1 = query(
          collection(db, "products"),
          orderBy("price"),
          startAt(this.firstVisible),
          endAt(this.lastVisible)
        );
        getDocs(previous1).then((docSnap) => {
          docSnap.forEach((doc) => {
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
          });
        });
        this.loading = false;
      });
    },
    async LoadPage(n) {
      if (this.ProductsNumber == n) {
        this.DesableNext = true;
        this.DesablePrevious = true;
      }
      if (n == 1) {
        this.DesablePrevious = false;
      }
      if (n > this.currentPage) {
        this.loading = true;
        this.DesablePrevious = true;
        let xx = n - this.currentPage;

        for (let index = 1; index < xx; index++) {
          const next = query(
            collection(db, "products"),
            orderBy("price"),
            startAfter(this.lastVisible),
            limit(this.ProductsPerPage)
          );

          await getDocs(next).then((querySnapshot) => {
            // this.products = [];

            this.lastVisible =
              querySnapshot.docs[querySnapshot.docs.length - 1];
            this.firstVisible =
              querySnapshot.docs[
                querySnapshot.docs.length - this.ProductsPerPage
              ];
          });
        }
        const nextz = query(
          collection(db, "products"),
          orderBy("price"),
          startAfter(this.lastVisible),
          limit(this.ProductsPerPage)
        );
        await getDocs(nextz).then((querySnapshot) => {
          this.products = [];
          this.name = "";
          querySnapshot.forEach((doc) => {
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
          });

          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          this.firstVisible =
            querySnapshot.docs[
              querySnapshot.docs.length - this.ProductsPerPage
            ];
        });
        this.loading = false;
        this.currentPage = n;
      } else if (n < this.currentPage) {
        this.loading = true;
        this.DesableNext = false;
        let xx = this.currentPage - n;
        const previous = query(
          collection(db, "products"),
          orderBy("price"),
          endBefore(this.firstVisible)
        );
        getDocs(previous).then((querySnapshot) => {
          this.products = [];

          // this.DesablePrevious = true;
          this.DesableNext = false;
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          this.firstVisible =
            querySnapshot.docs[
              querySnapshot.docs.length - xx * this.ProductsPerPage
            ];
          if (querySnapshot.docs.length - this.ProductsPerPage == 0) {
            this.DesablePrevious = false;
          }
          const previous1 = query(
            collection(db, "products"),
            orderBy("price"),
            startAt(this.firstVisible),
            limit(this.ProductsPerPage)
          );
          getDocs(previous1).then((docSnap) => {
            docSnap.forEach((doc) => {
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
            });
            this.lastVisible = docSnap.docs[docSnap.docs.length - 1];
            this.firstVisible =
              docSnap.docs[docSnap.docs.length - this.ProductsPerPage];
          });
          this.loading = false;
        });

        this.loading = false;
        this.currentPage = n;
      }
    },
  },
};
</script>
<style>
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
  --btnactivefs: rgb(241, 195, 46);

  --label-index: #960796;
  --danger-index: #5bc257;
  /* PAGINATE */
  --link-color: #000;
  --link-color-hover: #fff;
  --bg-content-color: #ffcc00;
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
.card1 h5 {
  overflow: hidden;
  height: 55px;
  font-weight: 300;
  font-size: 1rem;
}
</style>