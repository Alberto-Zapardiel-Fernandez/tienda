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
            // Obtener el nombre original del archivo
            String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            // Obtener la ruta completa de almacenamiento
            String uploadDir = "images";
            Path uploadPath = Paths.get(uploadDir, originalFilename);
            String uploadPathAbsolute = Paths.get(Objects.requireNonNull(env.getProperty("user.dir")), "src/main/resources/static").toString();
            Path targetLocation = Paths.get(uploadPathAbsolute, uploadPath.toString());
            // Guardar el archivo en el sistema de archivos
            file.transferTo(targetLocation);
            // Crear la URL de la imagen y devolvemos
            return "/images/" + originalFilename;
        } else {
            return "";
        }
    }
}
