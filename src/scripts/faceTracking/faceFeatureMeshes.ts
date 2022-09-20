// Landmark point ids illustrated here:
// https://raw.githubusercontent.com/rcsmit/python_scripts_rcsmit/master/extras/Gal_Gadot_by_Gage_Skidmore_4_5000x5921_annotated_white_letters.jpg
export const JAWLINE_POINTS = [172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397]

export const FOREHEAD_POINTS = [127, 162, 21, 54, 103, 67, 109, 10, 338, 297, 332, 284, 251, 389, 356]
export const SOUL_PATCH_POINTS = [83, 18, 200, 313]
export const NOSETIP_POINT = 4

// Define the mesh for the chin strap
export const CHINSTRAP_POINTS = [
  58, 138,
  172, 135,
  136, 169,
  150, 170,
  149, 140,
  176, 171,
  148, 175,
  152, 396,
  377, 369,
  400, 395,
  378, 394,
  379, 364,
  365, 367,
  397, 288
]

export const CHINSTRAP_INDICES = [
  0, 1, 2,
  1, 2, 4,
  1, 4, 3,
  3, 4, 6,
  3, 6, 5,
  5, 6, 8,
  5, 8, 7,
  7, 8, 10,
  7, 10, 9,
  9, 10, 12,
  9, 12, 11,
  11, 12, 14,
  11, 14, 13,
  13, 14, 16,
  13, 16, 15,
  15, 16, 18,
  15, 18, 17,
  17, 18, 20,
  17, 20, 19,
  19, 20, 22,
  19, 22, 21,
  21, 22, 24,
  21, 24, 23,
  23, 24, 26,
  23, 26, 25,
  25, 26, 27
]


// Define the mesh for the mustache
export const STACHE_POINTS = [
  169, 170, // 0, 1
  210, 211, // 2, 3
  202, // 4
  212, 57, // 5, 6
  186, 185, // 7, 8
  92, 40, // 9, 10
  165, 39, // 11, 12
  167, 37, // 13, 14
  164, 0, // 15, 16
  393, 267, // 17, 18
  391, 269, // 19, 20
  322, 270, // 21, 22
  410, 409, // 23, 24
  432, 287, // 25, 26
  422, // 27
  430, 431, // 28, 29
  394, 395 // 30, 31
]

export const STACHE_INDICES = [
  0, 1, 2,     // Face 0
  2, 1, 3,     // Face 1
  2, 3, 4,     // Face 2
  2, 4, 5,     // Face 3
  5, 4, 6,     // Face 4
  5, 6, 7,     // Face 5
  5, 7, 9,     // Face 6
  7, 6, 8,     // Face 7
  7, 8, 9,     // Face 8
  9, 8, 10,    // Face 9
  9, 10, 11,   // Face 10
  11, 10, 12,  // Face 11
  11, 12, 13,  // Face 12
  13, 12, 14,  // Face 13
  13, 14, 15,  // Face 14
  15, 14, 16,  // Face 15
               // center above lip
  15, 16, 18,  // Face 16
  15, 18, 17,  // Face 17
  17, 18, 20,  // Face 18
  17, 20, 19,  // Face 19
  19, 20, 22,  // Face 20
  19, 22, 21,  // Face 21
  21, 22, 24,  // Face 22
  21, 24, 23,  // Face 23
  23, 24, 26,  // Face 24
  23, 26, 25,  // Face 25
  21, 23, 25,  // Face 26
  25, 26, 27,  // Face 27
  25, 27, 28,  // Face 28
  29, 28, 27,  // Face 29
  29, 28, 31,  // Face 30
  28, 30, 31   // Face 31
]
