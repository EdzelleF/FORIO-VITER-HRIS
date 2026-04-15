<?php

class Roles {
    public $role_aid;
    public $role_is_active;
    public $role_name;
    public $role_description;
    public $role_created;
    public $role_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsRoles;

    public function __construct($db){
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_roles";
    }

    public function create(){
        try {
            $sql = "INSERT INTO {$this->tblSettingsRoles} (
                        role_is_active,
                        role_name,
                        role_description,
                        role_created,
                        role_updated
                    ) VALUES (
                        :role_is_active,
                        :role_name,
                        :role_description,
                        :role_created,
                        :role_updated
                    )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ":role_is_active" => $this->role_is_active,
                ":role_name" => $this->role_name,
                ":role_description" => $this->role_description,
                ":role_created" => $this->role_created,
                ":role_updated" => $this->role_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();

            
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readAll(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsRoles} ";
            $query = $this->connection->query($sql);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function update(){
        try {
            $sql = "update {$this->tblSettingsRoles} set" ;
            $sql .= "roles_name = :role_name,";
            $sql .= "roles_description = :role_description,";
            $sql .= "roles_updated = :role_updated";
            $sql .= "where role_aid = :role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_name" => $this->role_name,
                "role_description" => $this->role_description,
                "role_updated" => $this->role_updated,
                "role_aid" => $this->role_aid,
            ]);
        } catch (PDOException $e){
            $query = false;
        }
        return $query
    }
}