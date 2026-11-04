/* Merchandise is attached to its own shop; online examples do not imply branch stock. */
const storeShoppingItems = {};
for (const cluster of Object.values(shopClusters)) {
  for (const store of cluster.stores) {
    storeShoppingItems[store.id] = [...(venueGuides[store.guideKey]?.items || [])];
  }
}
// These two source entries explicitly belong to the separate Complex2 building.
storeShoppingItems['akiba-mandarake-complex2'] = venueGuides.mandarake.items.filter(item => /Complex2/.test(item.where || ''));
storeShoppingItems['akiba-mandarake-complex'] = venueGuides.mandarake.items.filter(item => !/Complex2/.test(item.where || ''));
storeShoppingItems['sullen-tokyo'] = shopMoodExtraItems.filter(item => item.id.includes('sullen'));
storeShoppingItems['archive-store-jinnan'] = shopMoodExtraItems.filter(item => item.id.includes('archive'));
