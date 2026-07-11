import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomeDocumentDataSlicesSlice = HeroSlice | FeaturedWorkSlice | TextBlockSlice

/**
 * Content for Home documents
 */
interface HomeDocumentData {
	/**
	 * Page sections field in *Home*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomeDocumentDataSlicesSlice>;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

type PageDocumentDataSlicesSlice = HeroSlice | FeaturedWorkSlice | TextBlockSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Page sections field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

export type AllDocumentTypes = HomeDocument | PageDocument;

/**
 * Primary content in *FeaturedWork → Default → Primary*
 */
export interface FeaturedWorkSliceDefaultPrimary {
	/**
	 * Eyebrow field in *FeaturedWork → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Selected work
	 * - **API ID Path**: featured_work.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *FeaturedWork → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Recent projects with room for story and motion.
	 * - **API ID Path**: featured_work.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
}

/**
 * Primary content in *FeaturedWork → Items*
 */
export interface FeaturedWorkSliceDefaultItem {
	/**
	 * Project title field in *FeaturedWork → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Residential identity
	 * - **API ID Path**: featured_work.items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Project meta field in *FeaturedWork → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Brand system / Web / Launch
	 * - **API ID Path**: featured_work.items[].meta
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta: prismic.KeyTextField;
}

/**
 * Default variation for FeaturedWork Slice
 *
 * - **API ID**: `default`
 * - **Description**: Featured work list.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedWorkSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeaturedWorkSliceDefaultPrimary>, Simplify<FeaturedWorkSliceDefaultItem>>;

/**
 * Slice variation for *FeaturedWork*
 */
type FeaturedWorkSliceVariation = FeaturedWorkSliceDefault

/**
 * FeaturedWork Shared Slice
 *
 * - **API ID**: `featured_work`
 * - **Description**: List of featured work entries.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedWorkSlice = prismic.SharedSlice<"featured_work", FeaturedWorkSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Studio edit
	 * - **API ID Path**: hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Crystal Living
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Subheading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Short editorial introduction.
	 * - **API ID Path**: hero.default.primary.subheading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	subheading: prismic.RichTextField;
	
	/**
	 * CTA label field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: View work
	 * - **API ID Path**: hero.default.primary.cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA link field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Hero with headline, supporting copy, CTA, and image.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Large first-screen editorial hero.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *TextBlock → Default → Primary*
 */
export interface TextBlockSliceDefaultPrimary {
	/**
	 * Eyebrow field in *TextBlock → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Studio note
	 * - **API ID Path**: text_block.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Body field in *TextBlock → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: A flexible dark editorial section.
	 * - **API ID Path**: text_block.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for TextBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Dark text block.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextBlockSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TextBlock*
 */
type TextBlockSliceVariation = TextBlockSliceDefault

/**
 * TextBlock Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: Editorial text section.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSlice = prismic.SharedSlice<"text_block", TextBlockSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomeDocument,
			HomeDocumentData,
			HomeDocumentDataSlicesSlice,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			AllDocumentTypes,
			FeaturedWorkSlice,
			FeaturedWorkSliceDefaultPrimary,
			FeaturedWorkSliceDefaultItem,
			FeaturedWorkSliceVariation,
			FeaturedWorkSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			TextBlockSlice,
			TextBlockSliceDefaultPrimary,
			TextBlockSliceVariation,
			TextBlockSliceDefault
		}
	}
}