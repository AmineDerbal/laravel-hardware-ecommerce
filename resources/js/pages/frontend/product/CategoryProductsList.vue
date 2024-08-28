<template>
  <LayoutView>
    <LoaderView v-if="isLoading" />
    <div v-if="hasError">An Error has occurred</div>
    <div
      v-if="!isLoading && !hasError"
      class="py-3"
      :key="categoryProducts"
    >
      <BRow class="mb-3">
        <BCol
          class="d-none d-lg-block"
          lg="2"
        ></BCol>
        <BCol lg="10">
          <div class="mb-3">
            <nav aria-label="breadcrumb">
              <BBreadcrumb>
                <BBreadcrumbItem>
                  <RouterLink to="/">Home</RouterLink></BBreadcrumbItem
                >
                <BBreadcrumbItem
                  v-for="category in categoryProducts.category_parent_path"
                  :key="category.slug"
                >
                  <RouterLink
                    :to="{
                      name: 'category-products',
                      params: { slug: category.slug },
                    }"
                    >{{ category.name }}</RouterLink
                  >
                </BBreadcrumbItem>
                <BBreadcrumbItem active
                  ><span class="text-primary"
                    >Page {{ page }}</span
                  ></BBreadcrumbItem
                >
              </BBreadcrumb>
            </nav>
          </div>
          <ProductsGrid :items="categoryProducts.products.data" />
          <PaginationUtils
            :meta="categoryProducts.products.meta"
            :links="categoryProducts.products.links"
            :onPageChange="onPageChange"
            :isRed="true"
          />
        </BCol>
      </BRow>
    </div>
  </LayoutView>
</template>

<script>
import { computed, onBeforeMount, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  LayoutView,
  LoaderView,
  ProductsGrid,
  PaginationUtils,
} from '@/components';
import { useProductStore } from '@/state';

export default {
  components: { LayoutView, LoaderView, ProductsGrid, PaginationUtils },

  setup() {
    const store = useProductStore();
    const route = useRoute();
    const router = useRouter();
    const categoryProducts = computed(() => store.categoryProducts);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);

    const getPage = () => route.query.page || 1;
    const getSlug = () => route.params.slug;

    const onPageChange = (page) => {
      router.push({
        name: 'category-products',
        params: { slug: getSlug() },
        query: { page: page },
      });
    };

    onBeforeMount(async () => {
      await store.getCategoryProducts(getSlug(), getPage());
    });

    onUpdated(async () => {
      await store.getCategoryProducts(getSlug(), getPage());
    });

    return {
      categoryProducts,
      isLoading,
      hasError,
      onPageChange,
      page: getPage(),
    };
  },
};
</script>
