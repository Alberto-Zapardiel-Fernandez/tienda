package com.alberto.zapardiel.tienda.utils;

/**
 * Utils
 * @author Alberto Zapardiel Fernández
*/
public class Utils {

    /**
     * Method to capitalize a string
     * @param name the name
     * @return the name capitalized
     */
    public static String capitalize(String name){
        if (name == null || name.isEmpty()) {
            return name;
        }

        StringBuilder sb = new StringBuilder();
        boolean isFirstWord = true;

        for (char character : name.toCharArray()) {
            if (isFirstWord) {
                sb.append(Character.toUpperCase(character));
                isFirstWord = false;
            } else if (character == ' ') {
                isFirstWord = true;
            } else {
                sb.append(character);
            }
        }

        return sb.toString().trim();
    }
}
