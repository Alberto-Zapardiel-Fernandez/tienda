package com.alberto.zapardiel.tienda.service.image;

import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

/**
 * Image Service
 *
 * @author Alberto Zapardiel Fernández
 */
@Service
@AllArgsConstructor
public class ImageServiceImpl {


    private Environment env;

    public String uploadImage(MultipartFile file) throws IOException {
        if (file != null) {
            // Generar un nombre único para el archivo
            String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String fileName = UUID.randomUUID() + "_" + originalFilename;
            // Obtener la ruta completa de almacenamiento (relativa al directorio de recursos estáticos)
            String uploadDir = "images";
            Path uploadPath = Paths.get(uploadDir, fileName);// Obtener la ruta absoluta al directorio de recursos estáticos
            String uploadPathAbsolute = Paths.get(Objects.requireNonNull(env.getProperty("user.dir")), "src/main/resources/static").toString();// Combinar la ruta absoluta con la ruta relativa para obtener la ruta completa del archivo
            Path targetLocation = Paths.get(uploadPathAbsolute, uploadPath.toString());// Guardar el archivo en el sistema de archivos
            file.transferTo(targetLocation);// Crear la URL de la imagen y devolvemos
            return "/images/" + fileName;
        } else {
            return "";
        }
    }
}
