import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages Group
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              // Home Page Group
              S.listItem()
                .title('Home Page')
                .child(
                  S.list()
                    .title('Home Page Content')
                    .items([
                      S.documentTypeListItem('machineToolCategory').title('Category Page'),
                      S.documentTypeListItem('cta').title('Calls to Action'),
                    ])
                ),
              S.divider(),
              // About Page
              S.listItem()
                .title('About Page')
                .id('about')
                .child(S.document().schemaType('about').documentId('about')),
              // Contact Page
              S.listItem()
                .title('Contact Page')
                .id('contact')
                .child(S.document().schemaType('contact').documentId('contact')),
            ])
        ),
      S.divider(),
      
      // Shared/Global Group
      S.listItem()
        .title('Shared & Global')
        .child(
          S.list()
            .title('Shared & Global Content')
            .items([
              S.documentTypeListItem('gallery').title('Gallery'),
              S.listItem()
                .title('Footer')
                .id('footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),
      S.divider(),

      // Core Inventory
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('machineToolCategory').title('Categories'),
    ])
