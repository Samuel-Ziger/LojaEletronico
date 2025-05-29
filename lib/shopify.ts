// Configuração para integração com Shopify GraphQL API
export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key!,
      },
      body: JSON.stringify({ query, variables }),
    })

    return {
      status: result.status,
      body: await result.json(),
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      status: 500,
      error: "Error receiving data",
    }
  }
}

// Query para buscar todos os produtos
export async function getAllProducts() {
  return shopifyFetch({
    query: `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }`,
  })
}

// Query para buscar produto por handle
export async function getProduct(handle: string) {
  return shopifyFetch({
    query: `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    `,
    variables: { handle },
  })
}
