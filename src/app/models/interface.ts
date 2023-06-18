// Site quicktype.io transforma json em model typescript

  export interface Livro {
    title?:               string;
    authors?:             string[];
    publisher?:           string;
    publishedDate?:       Date;
    description?:         string;
    previewLink?:         string;
    thumbnail?:           string;
  }

  export interface Item {
    volumeInfo: VolumeInfo;
  }

  export interface LivrosResultado {
    items: Item[];
    totalItems: number;
  }

  // Interfaces retornadas pela API do Google
  export interface VolumeInfo {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       Date;
    description:         string;
    pageCount:           number;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    imageLinks:          ImageLinks;
    language:            string;
    previewLink:         string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
    small:          string;
    medium:         string;
    large:          string;
    extraLarge:     string;
}

